require("dotenv").config();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const express = require("express");
const multer = require("multer")();
const joi = require("joi");
const image = require("./controllers/image");
const db = require("./knex/knex");
const profile = require("./controllers/profile");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");

const app = express();
app.use(cors({ methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.post("/signin", signIn.handleSignIn(db, bcrypt, joi));

app.post("/register", register.handleRegister(db, bcrypt, joi));

app.get("/profile/:id", profile.handleGetProfile(db));

app.get("/profile/:id/images", profile.handleGetImages(db));

app.patch("/profile/:id", profile.handleUpdateProfile(db));

app.post("/image", multer.single("file"), image.handleUpload(db));

app.post("/image/facialRecognition", image.handleApiCall());

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
