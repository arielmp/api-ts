import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import PostsRoutes from "./routes/PostsRoutes";
import UserRoutes from "./routes/UserRoutes";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    //DB
    const MONGO_URI = "mongodb://localhost/restts";
    mongoose.set("useFindAndModify", true);
    mongoose
      .connect(process.env.MONGODB_URL || MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
      })
      .then(db => console.log("db connected"))
      .catch(err => console.log(err));
    //SETTINGS
    this.app.set("port", process.env.PORT || 3000);
    // MIDDLEWARES
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  routes() {
    this.app.use(indexRoutes);
    this.app.use("/api/posts", PostsRoutes);
    this.app.use("/api/users", UserRoutes);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
