import express from "express";
import cors from "cors";
import client from "./db/dbConnect.js";
const app = express();
import dotenv from "dotenv";

// All Route Import

// Require ==========>
dotenv.config();

// All Route Import
import userRouter from "./routes/user.route.js";

// Require ==========>
const PORT = process.env.PORT || 5000;

// Middle-Ware
app.use(cors());
app.use(express.json());

const run = async () => {
  try {
    // Connect DataBase
    await client.connect();
    console.log("DB Connected");

    // Router
    app.use("/v1/user", userRouter);

    //
  } finally {
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Server");
});

app.listen(PORT, () => {
  console.log("server is running port", PORT);
});
