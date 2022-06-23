import express from "express";
import mongoose from "mongoose";
/////////////////////////////////////////////////////////////////////////
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import checkAuth from "./utils/checkAuth.js";
import { UserController, PostController } from "./controllers/index.js";
//////////////////////////////////////////////////////////////////////////
mongoose
  .connect(
    `mongodb+srv://admin:123@cluster0.ahxvvop.mongodb.net/blog?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());
/////////////////////////////////////////////////
app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);
/////////////////////////////////////////////////

app.get("/posts", PostController.getAll);
// app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
// app.delete("/posts", PostController.remove);
// app.patch("/posts/:id", PostController.update);

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
