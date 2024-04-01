import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/ /g,"_"));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000 * 5,
  },
 });

 export const uploadSingle = upload.single("image");
