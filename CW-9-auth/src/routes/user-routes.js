import { Router } from "express";
import bcrypt from "bcrypt";
const userRoutes = Router();
userRoutes.get("/user/signin", (req, res) => {
  res.render("form_auth");
});

userRoutes.get("/user/signup", (req, res) => {
  res.render("form_register");
});
//реєстрація
userRoutes.post("/user/signup", (req, res) => {
  //TODO: валідація даних
  /*
    1) login, email, password, confirm_password
    2) якщо все добре, записуєте користувача в масив(або файл)
    */
  //   const hash = bcrypt.hashSync(req.body.password, 10);
  //   const old_hash =
  //     "$2b$10$J9hYH1nGL9LoYncBDKGgBOoCQ69frW6VMId2EGjXMPoLlrgXBgD/y";
  //   console.log(bcrypt.compareSync(req.body.password, old_hash));

  res.cookie("user", req.body.login, {
    httpOnly: true,
    maxAge: 1000000,
  });
  res.redirect("/");
});

export default userRoutes;
