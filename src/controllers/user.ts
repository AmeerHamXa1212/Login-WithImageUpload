import express, { Request, Response, NextFunction } from "express";
import pool from "../config/db-config";
import { body, validationResult } from "express-validator";
import cloudinary from "../config/cloudinary-config";
import { checkAndReturnIfEmpty } from "../helper/null-checks";

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get text params from the request body
  const { username, email, user_password } = req.body;
  // Upload the image to Cloudinary
  cloudinary.uploader.upload(
    req.file.path,
    // `./src/images/${req.file.originalname}`,
    function (err: any, result: any) {
      if (result.url) {
        const image_url = result.url;
        // Save user data and image URL in the database
        pool.query(
          "INSERT INTO Users (username, email, user_password, image_url) VALUES ($1, $2, $3, $4)",
          [username, email, user_password, image_url],
          (err: any, _result: any) => {
            return res
              .status(201)
              .json({ message: "User registered successfully" });
          }
        );
      } else {
        console.error("Error uploading to Cloudinary");
        return res.status(500).json({ message: "Error uploading image" });
      }
    }
  );
};
export const LoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { user_id } = req.body;
  const userQuery = "SELECT * FROM Users WHERE user_id = $1 ";
  const userResult = await pool.query(userQuery, [user_id]);
  checkAndReturnIfEmpty(userResult, res, "Invalid Credentials");
  return res.status(200).json({ message: `Logged in successfully` });
};
export const Ping = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: `Welcome to Login application`,
  });
};
