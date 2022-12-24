import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.json({
    message: "Welcome to an Image REST API",
  });
});

export default route;
