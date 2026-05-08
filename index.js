const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middle Ware
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://simpleCrudUser:He0npa0OC0HpS8uW@clusterdb.v7a4npo.mongodb.net/?appName=ClusterDB
// // mongodb+srv://simpleCrudUser:He0npa0OC0HpS8uW@clusterdb.v7a4npo.mongodb.net/?appName=ClusterDB`;
const uri =
  "mongodb+srv://simpleCrudUser:He0npa0OC0HpS8uW@clusterdb.v7a4npo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("simpleCrudDB");
    const userCollection = db.collection("users");

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = {
        _id: new ObjectId(id),
      };

      const user = await userCollection.findOne(query);

      console.log(user);

      res.send(user);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    console.log(error);
  }
}
run();

app.get("/", (req, res) => {
  res.send("Simple crud server is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
