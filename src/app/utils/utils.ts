"use server";
import { mongodbConnectThenAggregate } from "@geeleed/short-mongodb";
import { dataAddress } from "./dataAddress";
import { SignJWT, importJWK, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { secretJWK } from "./secretJWK";
import { redirect } from "next/navigation";

interface isMember {
  username: string;
  password: string;
}
export const isMember = async ({ username, password }: isMember) =>
  await mongodbConnectThenAggregate(dataAddress, [
    { $match: { username, password } },
  ]).then((data) => data[0] !== undefined);

export const hadUser = async (username: string) =>
  await mongodbConnectThenAggregate(dataAddress, [
    { $match: { username } },
  ]).then((data) => data[0] !== undefined);

export const hadUserBirth = async ({
  username,
  birthDate,
}: {
  username: string;
  birthDate: string;
}) =>
  await mongodbConnectThenAggregate(dataAddress, [
    { $match: { username, birthDate } },
  ]).then((data) => data[0] !== undefined);

export const setToken = async ({ username, password }: isMember) => {
  const secretKey = await importJWK(secretJWK, "HS256");
  const token = await new SignJWT({
    username,
    password,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // .setExpirationTime(process.env.TOKEN_EXPIRE || "2h") // Token expires in ...
    .sign(secretKey);

  cookies().set("token", token);
};

export const verifyToken = async () => {
  try {
    await decryptToken();
    redirect("/mydiary");
  } catch (error) {
    console.error("verifyToken", error);
  }
};

export const decryptToken = async () => {
  try {
    const token = cookies().get("token");
    const secretKey = await importJWK(secretJWK, "HS256");
    const { payload } = await jwtVerify(token!.value, secretKey);
    return payload;
  } catch (error) {
    console.log("decryptToken", error);
  }
};
