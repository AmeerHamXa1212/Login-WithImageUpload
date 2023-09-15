import { Ping, RegisterUser, LoginUser } from "../controllers/user";
import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";

const UserRouter = Router();

const upload = multer({ dest: "./src/images/" });
// Create a multer middleware to handle file uploads
const uploadMiddleware = upload.single("image");

UserRouter.get("/ping", Ping);
UserRouter.post("/register", uploadMiddleware, RegisterUser);
UserRouter.post("/login", LoginUser);

export default UserRouter;
