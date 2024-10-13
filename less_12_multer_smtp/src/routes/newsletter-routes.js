import { Router } from "express";
import { sendEmail } from "../middlewars/sendemail-middleware.js";
const newsletterRoutes = Router();
newsletterRoutes
  .route("/newsletter")
  .get((req, res) => {
    res.render("subscribe_newsletter");
  })
  .post(sendEmail);

export default newsletterRoutes;
