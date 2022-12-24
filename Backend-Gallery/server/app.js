import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileupload from "express-fileupload";
import ImageRoutes from "./routes/images.routes";
import IndexRoute from "./routes/index.routes";
import { config } from "dotenv";
config();

const app = express();

// variables conf
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(morgan("dev"));
app.use(
  fileupload({
    tempFileDir: "/temp",
  })
);
app.use(cors());
app.use(express.json());

// routes
app.use("/api/image", ImageRoutes);
app.use("/", IndexRoute);

// export module with ecma6

export default app;
