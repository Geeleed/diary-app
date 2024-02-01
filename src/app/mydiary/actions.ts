"use server";
import {
  mongodbConnect,
  mongodbConnectThenAggregate,
  mongodbConnectThenInsert,
} from "@geeleed/short-mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { contentAddress } from "../utils/dataAddress";
import { decryptToken } from "../utils/utils";
import { ObjectId } from "mongodb";
import { hash256 } from "../utils/hash256";

export async function logout() {
  cookies().delete("token");
  return redirect("/home");
}

export const addDiary = async (content: any) => {
  await mongodbConnectThenInsert(contentAddress, content);
};

export const getDiary = async () => {
  const payload = await decryptToken();
  // console.log("getDiary", payload);
  const { username }: any = payload;
  const content = await mongodbConnectThenAggregate(contentAddress, [
    { $match: { username } },
  ]).then((res) => res);
  return JSON.stringify(content);
};
export const getDiaryByPreId = async (preId: string) => {
  const res = await mongodbConnectThenAggregate(contentAddress, [
    { $match: { preId: preId } },
  ]).then((res) => res);
  return JSON.stringify(res);
};
export const getLatestDiary = async () => {
  const payload = await decryptToken();
  const { username }: any = payload;
  const content = await mongodbConnectThenAggregate(contentAddress, [
    { $match: { username } },
    { $sort: { clientTimestamp: -1 } },
    { $limit: 1 },
  ]).then((res) => res);
  // console.log("getOneDiary", content);
  return JSON.stringify(content);
};

export const addThenGetLatestDiary = async (content: any) => {
  await addDiary(content);
  return await getDiaryByPreId(content.preId).then((res) => res);
};

export const deleteDocumentBy_id = async (_id: any) => {
  const connection = await mongodbConnect(contentAddress.connectionString);
  await connection
    .db(contentAddress.databaseName)
    .collection(contentAddress.collectionName)
    .deleteOne({ _id: new ObjectId(_id) });
  await connection.close();
};

export const editDiaryBy_id = async (objectData: any) => {
  const connection = await mongodbConnect(contentAddress.connectionString);
  await connection
    .db(contentAddress.databaseName)
    .collection(contentAddress.collectionName)
    .updateOne({ _id: new ObjectId(objectData.edit_id) }, { $set: objectData });
  await connection.close();
};
export const updateThenGetDiary = async (objectData: any) => {
  // const {
  //   edit_id,
  //   content,
  //   image,
  //   link,
  //   mood,
  //   hh,
  //   mm,
  //   ss,
  //   day,
  //   dayName,
  //   month,
  //   year,
  //   clientTimestamp,
  // } = objectData;
  await editDiaryBy_id(objectData);
  const updated = await mongodbConnectThenAggregate(contentAddress, [
    { $match: { _id: new ObjectId(objectData.edit_id) } },
  ]);
  return JSON.stringify(updated);
};
export const getUsernameFromToken = async () => {
  try {
    const { username }: any = await decryptToken();
    return username;
  } catch (error) {
    console.error(error);
  }
};

export const filter = async (param: any) => {
  const username = await getUsernameFromToken();
  let { dateFrom, dateTo, mood } = param;
  if (!dateFrom) dateFrom = 0;
  if (!dateTo) dateTo = new Date().getTime();
  if (!mood) mood = undefined;
  if (mood) {
    const res: string = await mongodbConnectThenAggregate(contentAddress, [
      {
        $match: {
          username,
          clientTimestamp: { $gte: dateFrom, $lte: dateTo },
        },
      },
      { $match: { mood } },
    ]).then((res) => JSON.stringify(res));
    return res;
  } else {
    const res: string = await mongodbConnectThenAggregate(contentAddress, [
      {
        $match: {
          username,
          clientTimestamp: { $gte: dateFrom, $lte: dateTo },
        },
      },
    ]).then((res) => JSON.stringify(res));
    return res;
  }
};
