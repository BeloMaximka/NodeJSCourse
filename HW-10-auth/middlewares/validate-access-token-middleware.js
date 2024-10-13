import jwt from "jsonwebtoken";

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_ECRET;
if (!jwtAccessSecret || !jwtRefreshSecret) {
  throw Error("Missing JWT_ACCESS_SECRET or JWT_REFRESH_ECRET env variable");
}

const valdiateAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  jwt.verify(token, jwtAccessSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
};

export { valdiateAccessToken };
