import express from "express";
import cors from "cors";

import askGPTRouter from "./routes/askGPT";
import authRouter from "./routes/auth";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(askGPTRouter);
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to betterCanvas API");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
