import id3 from "node-id3";
import storageService from "../services/storage.service.js";
import songModel from "../models/song.model.js";

export const uploadSong = async (req, res) => {
  const songBuffer = req.file.buffer;
  const mood = req.body.mood;

  if (!req.file) {
    return res.status(400).json({
      message: "file is required to create a music",
    });
  }

  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    storageService({
      buffer: songBuffer,
      filename: tags?.title + ".mp3",
      folder: "/moodify/songs",
    }),
    storageService({
      buffer: tags?.image?.buffer,
      filename: tags?.image?.title + ".jpeg",
      folder: "/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    url: songFile.url,
    posterUrl: posterFile.url,
    title: tags.title,
    mood: mood,
  });

  return res.status(201).json({
    message: "song uploaded successfully",
    song,
  });
};

// need the music files with poster and metadata

export const getSong = async (req, res) => {
  const mood = req.query?.mood;

  const song = await songModel.findOne({ mood });

  res.status(200).json({
    success: !!song,
    song,
  });
};
