import { DataAddress } from "@geeleed/short-mongodb";
export const dataAddress: DataAddress = {
  connectionString:
    process.env.CONNECTION_STRING || "mongodb://127.0.0.1:27017/",
  databaseName: process.env.DATABASE_NAME || "diary_app",
  collectionName: process.env.COLLECTION_MEMBER || "member",
};

export const contentAddress: DataAddress = {
  connectionString:
    process.env.CONNECTION_STRING || "mongodb://127.0.0.1:27017/",
  databaseName: process.env.DATABASE_NAME || "diary_app",
  collectionName: process.env.COLLECTION_CONTENT || "content",
};
