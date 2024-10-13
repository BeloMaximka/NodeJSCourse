import { users } from "../users.js";
import bcrypt from "bcrypt";
import { signJwt } from "../functions/signJwt.js";

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_ECRET;
if (!jwtAccessSecret || !jwtRefreshSecret) {
  throw Error("Missing JWT_ACCESS_SECRET or JWT_REFRESH_ECRET env variable");
}

export async function authenticateUser(req, res) {
  const user = validateInputAndReturnUser(req);
  if (!user) {
    return;
  }

  try {
    const oneMonthExpiration =
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
    const refreshToken = await signJwt(
      { email: user.email, exp: oneMonthExpiration },
      jwtRefreshSecret
    );

    const oneHourExpiration = Math.floor(Date.now() / 1000) + 60 * 60;
    const accessToken = await signJwt(
      { email: user.email, exp: oneHourExpiration },
      jwtAccessSecret
    );

    res.cookie("refresh_token", refreshToken, {
      secure: true,
      sameSite: true,
      httpOnly: true,
      maxAge: oneMonthExpiration * 1000,
      path: "/api/user/refresh-token",
    });

    res.send({ token: accessToken });
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
