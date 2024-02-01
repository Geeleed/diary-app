import crypto from "crypto";

export const hash256 = (data: string): string => {
  const hash = crypto.createHash("sha256");
  const hashedData = hash.update(data, "utf-8").digest("hex");
  // console.log("from hash256", hashedData);
  return hashedData;
};
