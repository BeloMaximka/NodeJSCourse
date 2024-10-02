import express from "express";
import { users } from "./users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw Error("Missing JWT_SECRET env variable");
}
const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
  res.send(users);
});

server.post("/api/user", (req, res) => {
  if (!req.body.login && !req.body.password) {
    res.sendStatus(400);
    return;
  }
  const user = users.find((user) => user.login === req.body.login);
  if (!user) {
    res.sendStatus(401);
    return;
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.sendStatus(401);
    return;
  }

  jwt.sign(
    { email: user.email, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    jwtSecret,
    (err, token) => res.send(token)
  );
});

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}`)
);
