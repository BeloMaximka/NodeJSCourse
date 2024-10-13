import { users } from "../users.js";
import bcrypt from "bcrypt";
import { sendRefreshAndAccessTokens } from "../functions/sendRefreshAndAccessTokens.js";

export async function authenticateUser(req, res) {
  const user = validateInputAndReturnUser(req);
  if (!user) {
    return;
  }
  try {
    await sendRefreshAndAccessTokens(res, user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

function validateInputAndReturnUser(req) {
  if (!req.body.login && !req.body.password) {
    res.sendStatus(400);
    return null;
  }
  const user = users.find((user) => user.login === req.body.login);
  if (!user) {
    res.sendStatus(401);
    return null;
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.sendStatus(401);
    return null;
  }
  return user;
}
