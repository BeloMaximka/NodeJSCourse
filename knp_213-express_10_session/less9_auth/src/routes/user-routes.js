import { Router } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../middlewars/createuser-middleware.js";
import { users } from "../data/users.js";
import { authUser } from "../middlewars/authuser-middleware.js";

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
  .post(createUser, (req, res) => {
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
    };
    res.redirect("/");
  });
userRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
export default userRoutes;
