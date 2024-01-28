"use server";

import { mongodbConnectThenInsert } from "@geeleed/short-mongodb";
import { hadUser, isMember, setToken } from "../utils/utils";
import { dataAddress } from "../utils/dataAddress";

interface UserPass {
  username: string;
  password: string;
}
export const loginProcess = async ({ username, password }: UserPass) => {
  try {
    const member = await isMember({ username, password }).then((res) => res);
    if (member) {
      await setToken({ username, password });
      return { canLogin: true };
    } else return { canLogin: false };
  } catch (error) {
    console.error(error);
  }
};
export const registerProcess = async ({ username, password }: UserPass) => {
  try {
    const member = await hadUser(username).then((res) => res);
    if (!member) {
      await mongodbConnectThenInsert(dataAddress, { username, password });
      await setToken({ username, password });
      return { canRegister: true };
    } else return { canRegister: false };
  } catch (error) {
    console.error(error);
  }
};

export const checkPattern = async (username: string) => {
  const pattern = /^[a-z0-9\-_.]{4,10}$/;
  return pattern.test(username);
};
