import jwt from "jsonwebtoken";

export async function signJwt(payload, secret) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}
