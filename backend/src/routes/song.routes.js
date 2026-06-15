import express from "express";
import { getSong, uploadSong } from "../controllers/song.controller.js";
import upload from "../middlewares/upload.middleware.js";

const songRouter = express.Router();

songRouter.post("/", upload.single('song'), uploadSong);

songRouter.get('/', getSong)

export default songRouter;
