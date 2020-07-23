const Hero = require("../models/hero.model");
const fs = require("fs");

const multer = require("multer");

const imageTypes = /jpeg|jpg|gif|png/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (imageTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
}).single("heroImage");

const setHeroStats = (req, res) => {
  Hero.set(req.body, (errors, heroStats) => {
    if (errors) {
      return res.status(400).json({ errors });
    }
    res.status(200).json(heroStats);
  });
};
const getHeroStats = (req, res) => {
  res.status(200).json(Hero.get());
};

const uploadHeroImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "Image too large" });
      }
      if (err.code == "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ error: "Unexpected field" });
      }
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Image not uploaded" });
    }

    //Удаление всех картинок в папке uploads кроме текущей картинки
    (await fs.promises.readdir("uploads")).forEach(async (fileName) => {
      if (req.file.originalname !== fileName)
        await fs.promises.unlink(`uploads/${fileName}`);
    });

    res.status(200).json({ message: "Image uploaded" });
  });
};

const getHeroImage = async (req, res) => {
  try {
    const heroImage = (await fs.promises.readdir("uploads"))[0];
    if (!heroImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    const heroImageStream = fs.createReadStream(`uploads/${heroImage}`);

    res.set("Content-Type", `image/${heroImage.split(".").pop()}`);
    heroImageStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  setHeroStats,
  getHeroStats,
  uploadHeroImage,
  getHeroImage,
};
