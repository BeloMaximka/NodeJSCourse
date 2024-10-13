import { users } from "../users.js";
import { Router } from "express";
import { valdiateAccessToken } from "../middlewares/validate-access-token-middleware.js";
import { refreshAccessToken } from "../middlewares/refresh-access-token-middleware.js";
import { authenticateUser} from '../middlewares/authenticate-user-middleware.js';

const userRouter = new Router();


userRouter.get("/api/users", valdiateAccessToken, (req, res) => {
  res.send(users);
});
userRouter.post("/api/user", authenticateUser);
userRouter.post("/api/user/refresh-token", valdiateAccessToken, refreshAccessToken);



export { userRouter };
