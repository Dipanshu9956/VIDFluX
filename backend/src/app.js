import express from "express";
import cors from "cors";
import router from "./routes/stream.route.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/stream", router);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/{*name}", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;