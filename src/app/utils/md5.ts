import * as crypto from "crypto";

export const md5 = (input: string): string => {
  const md5Hash = crypto.createHash("md5");
  md5Hash.update(input);
  const md5String = md5Hash.digest("hex");
  return md5String;
};
