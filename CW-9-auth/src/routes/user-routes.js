import { Router } from "express";
import bcrypt from "bcrypt";
import { checkSchema, validationResult } from "express-validator";

const users = [];

const userRoutes = Router();
userRoutes.get("/user/signin", (req, res) => {
  res.render("form_auth");
});

userRoutes.post(
  "/user/signin",
  checkSchema({
    login: {
      isEmpty: { negated: true, errorMessage: "Login is required" },
    },
    password: {
      isEmpty: { negated: true, errorMessage: "Password is required" },
    },
  }),
  (req, res) => {
    const user = users.find((user) => user.login === req.body.login);
    if (!user) {
      renderSignInWithError(res);
      return;
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      renderSignInWithError(res);
      return;
    }
    setUserCookie(res, user.login);
    res.redirect("/");
  }
);

function renderSignInWithError(res) {
  res.render("form_auth", { error: "Login or password is incorrect" });
}
userRoutes.get("/user/signup", (req, res) => {
  res.render("form_register");
});

userRoutes.post(
  "/user/signup",
  checkSchema({
    email: { isEmail: { errorMessage: "Invalid email" } },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: "Password should contain at least 8 characters",
      },
    },
    confirm_password: {
      custom: { options: (value, data) => value === data.req.body.password },
      errorMessage: "Passwords do not match",
    },
    login: {
      isEmpty: { negated: true, errorMessage: "Login is required" },
    },
  }),
  (req, res) => {
    const result = validationResult(req).array();
    if (result.length > 0) {
      const errors = result.map((error) => error.msg);
      res.render("form_register", { errors });
      return;
      
    }

    const hash = bcrypt.hashSync(req.body.password, 10);
      users.push({
        email: req.body.email,
        login: req.body.login,
        password: hash,
      });
      setUserCookie(res, req.body.login);
      res.redirect("/");
  }
);

function setUserCookie(res, token) {
  res.cookie("user", token, {
    httpOnly: true,
    maxAge: 1000000,
  });
}

userRoutes.get("/user/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});

export default userRoutes;
