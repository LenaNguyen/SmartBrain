require("dotenv").config();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const express = require("express");
const multer = require("multer")();
const image = require("./controllers/image");
const db = require("./knex/knex");
const profile = require("./controllers/profile");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/signin", signIn.handleSignIn(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:id", profile.getProfile(db));

app.get("/profile/:id/images", profile.handleGetImages(db));

app.put("/image", image.handleImage(db));

app.post("/image", multer.single("file"), image.handleUpload(db));

app.post("/imageUrl", image.handleApiCall());

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
