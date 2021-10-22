const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user: mongodbAtlasUser1
// pass: tuJS4gQn3g99EcFs


const uri = "mongodb+srv://mongodbAtlasUser1:tuJS4gQn3g99EcFs@cluster0.sydng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const usersCollection = client.db("app").collection("users");

        // GET API
        app.get('/users', async (req, res) => {
            const users = await usersCollection.find({}).toArray();
            res.send(users);
        })
        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            result = await usersCollection.insertOne(newUser);
            res.json(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("CRUD");
})

app.listen(port, () => {
    console.log("Running Server on Port: ", port);
})