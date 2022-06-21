import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const username = encodeURIComponent("admin");
const password = encodeURIComponent(123);

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.kjqbs7f.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullname: "Igor",
    },
    "secret123"
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
