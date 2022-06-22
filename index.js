import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import { registerValidator } from "./validations/auth.js";

import UserModel from "./models/User.js";

const username = encodeURIComponent("admin");
const password = encodeURIComponent(123);

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.kjqbs7f.mongodb.net/blog?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.arrau());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегистрироватся",
    });
  }
});

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
