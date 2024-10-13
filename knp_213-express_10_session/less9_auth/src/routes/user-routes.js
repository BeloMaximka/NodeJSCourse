import { Router } from "express";
import { createUser } from "../middlewars/createuser-middleware.js";
import { users } from "../data/users.js";
import { authUser } from "../middlewars/authuser-middleware.js";
import { validateUnauthenticated } from "../middlewars/validate-unauthenticated-middleware.js";
import { validateAuthenticated } from "../middlewars/validate-authenticated-middleware.js";
import multer from "multer";

const userRoutes = Router();
userRoutes
  .route("/signin")
  .get(validateUnauthenticated, (req, res) => {
    res.render("form_auth");
  })
  .post(authUser, (req, res) => {
    req.session.user = {
      login: req.body.login,
      email: req.body.email,
      avatar: req.file.filename
    };
    res.redirect("/");
  });

userRoutes.get("/", (req, res) => {
  res.json(users);
  res.end();
});

const upload = multer({ dest: './public/image-uploads/' })
userRoutes
  .route("/signup")
  .get(validateUnauthenticated, (req, res) => {
    res.render("form_register");
  })
  .post(upload.single("avatar"), validateUnauthenticated, createUser, (req, res) => {
    //#region comments
    //TODO: валідація даних
    /*
      1) login, email, password, confirm_password
      2) якщо все добре, записуєте користувача в масив(або файл)
      */
    //   const hash = bcrypt.hashSync(req.body.password, 10);
    //   const old_hash =
    //     "$2b$10$J9hYH1nGL9LoYncBDKGgBOoCQ69frW6VMId2EGjXMPoLlrgXBgD/y";
    //   console.log(bcrypt.compareSync(req.body.password, old_hash));

    // res.cookie("user", req.body.login, {
    //   httpOnly: true,
    //   maxAge: 1000000,
    // });
    //#endregion
    req.session.user = {
      login: req.body.login,
      email: req.body.email,
      avatar: req.file.filename
    };
    console.log(req.file.filename);
    res.redirect("/");
  });
userRoutes.get("/logout", validateAuthenticated, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
export default userRoutes;
