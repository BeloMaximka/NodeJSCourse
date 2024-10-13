import { signJwt } from "../functions/signJwt.js";
import { verifyJwt } from "../functions/verifyJwt.js";

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_ECRET;
if (!jwtAccessSecret || !jwtRefreshSecret) {
  throw Error("Missing JWT_ACCESS_SECRET or JWT_REFRESH_ECRET env variable");
}

export async function refreshAccessToken(req, res) {
  try {
    const refreshToken = req.cookies["refresh_token"];
    await verifyJwt(refreshToken, jwtRefreshSecret);

    const oneHourExpiration = Math.floor(Date.now() / 1000) + 60 * 60;
    const token = await signJwt(
      { email: req.user.email, exp: oneHourExpiration },
      jwtRefreshSecret
    );
    res.send({ token });
  } catch (error) {
    res.sendStatus(503);
  }
}
