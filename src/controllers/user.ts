import express, { Request, Response, NextFunction } from "express";
import pool from "../config/dbconfig";
import { body, validationResult } from "express-validator";
import cloudinary from "../config/cloudinaryconfig";

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get text params from the request body
  const { username, email, user_password } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  // Upload the image to Cloudinary
  cloudinary.uploader.upload(
    `./src/images/${req.file.originalname}`,
    function (err: any, result: any) {
      if (result.url) {
        const image_url = result.url;
        console.log("Image file url :", image_url);
        // Save user data and image URL in the database
        pool.query(
          "INSERT INTO Users (username, email, user_password, image_url) VALUES ($1, $2, $3, $4)",
          [username, email, user_password, image_url],
          (err: any, _result: any) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json({ message: "Error saving user data" });
            }
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
  // Get text params from the request body
  const { user_id } = req.body;
  const userQuery = "SELECT * FROM Users WHERE user_id = $1 ";
  const userResult = await pool.query(userQuery, [user_id]);
  if (userResult.rows.length === 0) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  return res.status(200).json({ message: `Logged in successfully` });
};
export const ping = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: `Welcome to Login application`,
  });
};
