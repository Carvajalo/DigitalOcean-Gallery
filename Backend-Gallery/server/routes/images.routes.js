import { Router } from "express";
import * as ImageController from "../controller/image.controller";

const route = Router();

route.get("/", ImageController.getImages);

route.get("/default", ImageController.defaultEndpoint);

route.post("/upload", ImageController.uploadImage);

route.get("/:id", ImageController.getImage);

route.delete("/:id", ImageController.deleteImage);

route.put("/:id", ImageController.modifyImage);

export default route;
