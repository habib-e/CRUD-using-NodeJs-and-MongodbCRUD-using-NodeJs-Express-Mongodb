import express from "express";
import client from "../db/dbConnect.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// // collection
const userCollection = client.db("jobtask").collection("user_data");

// User Create
router.post("/", async (req, res) => {
  const addItem = req.body;
  try {
    const result = await userCollection.insertOne(addItem);
    res.send({ success: "User Create Succesfully", result });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get All Users Info
router.get("/", async (req, res) => {
  try {
    const items = await userCollection.find({}).toArray();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get single Users Info
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await userCollection.findOne(query);
  res.json(result);
});

// Update Single User
router.put("/:id", async (req, res) => {
  const user = req.body;
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = { $set: user };
  const result = await userCollection.updateOne(filter, updateDoc);
  res.json(result);
});

// Delete Single User
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const filter = { _id: new ObjectId(id) };

  const result = await userCollection.deleteOne(filter, user);
  res.json(result);
});

// Block or block
router.put("/block/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateUser = { $set: { block: true } };
  const result = await userCollection.updateOne(filter, updateUser);
  res.json(result);
});

// UnBlock or block
router.put("/unblock/:id", async (req, res) => {
  const id = req.params.id;

  const filter = { _id: new ObjectId(id) };
  const updateUser = { $set: { block: false } };
  const result = await userCollection.updateOne(filter, updateUser);
  res.json(result);
});

export default router;
