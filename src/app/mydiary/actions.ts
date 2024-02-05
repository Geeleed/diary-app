"use server";
import {
  mongodbConnect,
  mongodbConnectThenAggregate,
  mongodbConnectThenInsert,
} from "@geeleed/short-mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { contentAddress, dataAddress } from "../utils/dataAddress";
import { decryptToken, setToken } from "../utils/utils";
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

export const updateContentAIBy_id = async (objectData: any, _id: any) => {
  try {
    const connection = await mongodbConnect(contentAddress.connectionString);
    await connection
      .db(contentAddress.databaseName)
      .collection(contentAddress.collectionName)
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { contentAI: objectData.contentAI, preId: objectData.preId } }
      );
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

export const updateThenGetDiary = async (objectData: any) => {
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
export const getPasswordFromToken = async () => {
  try {
    const { password }: any = await decryptToken();
    return password;
  } catch (error) {
    console.error(error);
  }
};
export const updatePasswordBy_username_OldPassword = async (
  username: string,
  oldPassword: string,
  newPassword: string
) => {
  const connection = await mongodbConnect(dataAddress.connectionString);
  await connection
    .db(dataAddress.databaseName)
    .collection(dataAddress.collectionName)
    .updateOne(
      { username: username, password: oldPassword },
      { $set: { password: newPassword } }
    );
  await connection.close();
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
export const setNewPassword = async (newPassword: string) => {
  try {
    const username = await getUsernameFromToken().then((res) => res);
    const oldPassword = await getPasswordFromToken().then((res) => res);
    const password = hash256(username + newPassword);
    const connection = await mongodbConnect(dataAddress.connectionString);
    const collection = connection
      .db(dataAddress.databaseName)
      .collection(dataAddress.collectionName);
    await collection.updateOne(
      { username: username, password: oldPassword },
      { $set: { password } }
    );
    await connection.close();
    await setToken({ username, password });
    return "reset password success!";
  } catch (error) {
    console.log(error);
  }
};
export const getBirthDate = async () => {
  try {
    const username = await getUsernameFromToken().then((res) => res);
    const password = await getPasswordFromToken().then((res) => res);
    const doc = await mongodbConnectThenAggregate(dataAddress, [
      { $match: { username, password } },
    ]).then((res) => res);
    const birthDate = doc[0].birthDate;
    return birthDate;
  } catch (error) {
    console.log(error);
  }
};

export const setNewBirthDate = async (value: string) => {
  try {
    const username = await getUsernameFromToken().then((res) => res);
    const connection = await mongodbConnect(dataAddress.connectionString);
    const collection = connection
      .db(dataAddress.databaseName)
      .collection(dataAddress.collectionName);
    await collection.updateOne(
      { username: username },
      { $set: { birthDate: value } }
    );
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = async (confirmPassword: string) => {
  const username = await getUsernameFromToken().then((res) => res);
  if (
    (await getPasswordFromToken().then((res) => res)) ===
    hash256(username + confirmPassword)
  ) {
    const connection = await mongodbConnect(dataAddress.connectionString);
    await connection
      .db(dataAddress.databaseName)
      .collection(dataAddress.collectionName)
      .deleteOne({ username });
    await connection
      .db(contentAddress.databaseName)
      .collection(contentAddress.collectionName)
      .deleteMany({ username });
    await connection.close();
    await logout();
  }
};
