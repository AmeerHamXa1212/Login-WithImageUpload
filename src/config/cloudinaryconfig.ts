import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "dmjmoriem",
  api_key: "984349486729151",
  api_secret: "JIBI6Sw_0mvxUl2JELMGm4jt5uc",
});

export default cloudinary;
