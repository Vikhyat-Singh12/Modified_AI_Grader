import multer from "multer";

const storage = multer.memoryStorage(); // ✅ Store file in memory buffer

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});
