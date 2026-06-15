import ImageKit, { toFile } from "@imagekit/nodejs";
import { urlencoded } from "express";
import { configDotenv } from "dotenv";

configDotenv();

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const storageService = async ({ buffer, filename, folder }) => {
  const response = await client.files.upload({
    file: await toFile(Buffer.from(buffer), 'file'),
    fileName: filename,
    folder: folder,
  });
  return response;
};

export default storageService;
