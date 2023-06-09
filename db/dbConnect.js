import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Require ==========>
dotenv.config();

// DB Connection here
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0ymapef.mongodb.net/?retryWrites=true&w=majority`

// Create DataBase Client======>>>
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client;
