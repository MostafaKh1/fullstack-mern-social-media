import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./../server/routes/auth.js";
import usersRouter from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPosts } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import Post from "./models/Posts.js";
import User from "./models/User.js";
import { posts, users } from "./data/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", upload.single("picture"), createPosts);
// routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listen on port ${PORT}`);

      // User.insertMany(users);
      // Post.insertMany(posts);
    });
  })
  .catch((err) => console.log(err));
