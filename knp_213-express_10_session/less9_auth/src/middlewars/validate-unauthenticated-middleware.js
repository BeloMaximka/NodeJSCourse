import { isAuthenticated } from "../helpers/auth-helper.js";

export function validateUnauthenticated(req, res, next) {
  if (!isAuthenticated(req)) {
    next();
    return;
  }
  res.status(400);
  res.redirect("/");
}
