import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "assignments",
//       resource_type: "auto", // Supports PDFs
//       allowed_formats: ["pdf"], // Restrict to PDFs
//       access_mode: "public", // Ensure public access
//     };
//   },
// });

// const upload = multer({ storage });

export { cloudinary };
