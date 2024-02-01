"use server";

import {
  mongodbConnect,
  mongodbConnectThenInsert,
} from "@geeleed/short-mongodb";
import { hadUser, hadUserBirth, isMember, setToken } from "../utils/utils";
import { dataAddress } from "../utils/dataAddress";

interface UserPass {
  username: string;
  password: string;
}
interface UserPassBirth {
  username: string;
  password: string;
  birthDate: string;
}
export const loginProcess = async ({ username, password }: UserPass) => {
  try {
    const member = await isMember({ username, password }).then((res) => res);
    if (member) {
      await setToken({ username, password });
      return { canLogin: true };
    } else return { canLogin: false };
  } catch (error) {
    console.error("loginProcess", error);
  }
};
export const registerProcess = async ({
  username,
  password,
  birthDate,
}: UserPassBirth) => {
  try {
    const member = await hadUser(username).then((res) => res);
    if (!member) {
      await mongodbConnectThenInsert(dataAddress, {
        username,
        password,
        birthDate,
      });
      await setToken({ username, password });
      return { canRegister: true };
    } else return { canRegister: false };
  } catch (error) {
    console.error("registerProcess", error);
  }
};
export const resetProcess = async ({
  username,
  password,
  birthDate,
}: UserPassBirth) => {
  try {
    const member = await hadUserBirth({ username, birthDate }).then(
      (res) => res
    );
    if (member) {
      const connection = await mongodbConnect(dataAddress.connectionString);
      const collection = connection
        .db(dataAddress.databaseName)
        .collection(dataAddress.collectionName);
      await collection.updateOne(
        { username, birthDate },
        { $set: { password } }
      );
      await connection.close();
      await setToken({ username, password });
      return { canReset: true };
    } else return { canReset: false };
  } catch (error) {
    console.error("resetProcess", error);
  }
};

export const checkPattern = async (username: string) => {
  const pattern = /^[a-z0-9\-_.]{4,10}$/;
  return pattern.test(username);
};
