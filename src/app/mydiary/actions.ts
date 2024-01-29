"use server";
import {
  mongodbConnect,
  mongodbConnectThenAggregate,
  mongodbConnectThenInsert,
} from "@geeleed/short-mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { contentAddress } from "../utils/dataAddress";
import { decryptToken, verifyToken } from "../utils/utils";
import { ObjectId } from "mongodb";

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
  return await getLatestDiary();
};

export const deleteDocumentBy_id = async (_id: any) => {
  const connection = await mongodbConnect(contentAddress.connectionString);
  await connection
    .db(contentAddress.databaseName)
    .collection(contentAddress.collectionName)
    .deleteOne({ _id: new ObjectId(_id) });
  await connection.close();
};

export const getUsernameFromToken = async () => {
  try {
    const { username }: any = await decryptToken();
    return username;
  } catch (error) {
    console.error(error);
  }
};
