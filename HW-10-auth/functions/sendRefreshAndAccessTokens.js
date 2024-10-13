import { signJwt } from "./signJwt.js";

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_ECRET;
if (!jwtAccessSecret || !jwtRefreshSecret) {
  throw Error("Missing JWT_ACCESS_SECRET or JWT_REFRESH_ECRET env variable");
}

export async function sendRefreshAndAccessTokens (res, user) {
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
}