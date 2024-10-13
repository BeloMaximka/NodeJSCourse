import { Router } from "express";
import { createUser } from "../middlewars/createuser-middleware.js";
import { users } from "../data/users.js";
import { authUser } from "../middlewars/authuser-middleware.js";
import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "photos/",
  filename: (req, file, cb) => {
    cb(null, `${req.body.login}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

const userRoutes = Router();
userRoutes
  .route("/signin")
  .get((req, res) => {
    res.render("form_auth");
  })
  .post(authUser, (req, res) => {
    req.session.user = {
      login: req.body.login,
      email: req.body.email,
    };
    res.redirect("/");
  });

userRoutes.get("/", (req, res) => {
  res.json(users);
  res.end();
});

userRoutes
  .route("/signup")
  .get((req, res) => {
    res.render("form_register");
  })
  .post(upload.single("file"), createUser, (req, res) => {
    req.session.user = {
      login: req.body.login,
      email: req.body.email,
    };
    res.redirect("/");
  });
userRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
userRoutes.get("/list", (req, res) => {
  res.render("list_of_users", { users });
});
export default userRoutes;
