import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./src/routes/authRoutes.js";
import shortsRoutes from "./src/routes/shortsRoutes.js";
import cors from "cors";
import {config} from "dotenv"; 

config({
  path: "./config/config.env",
});
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(
  cors({
    origin: process.env.frontend_url,
    credentials: true,
    methods: ["put", "post", "get", "delete"],
  })
);

app.use("/api", authRoutes);
app.use("/api", shortsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


