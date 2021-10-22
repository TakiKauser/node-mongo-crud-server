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
/* 
client.connect(err => {
    const collection = client.db("app").collection("users");
    // perform actions on the collection object
    console.log("Hitting the Database");

    const user = { name: "kb", email: "kb@yahoo.com", phone: "01xxx083379" };
    collection.insertOne(user)
    .then(() => {
        console.log("Insertion Success");
    })

    // client.close();
});
 */
async function run() {
    try {
        await client.connect();
        const usersCollection = client.db("app").collection("users");

        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            result = await usersCollection.insertOne(newUser);

            // console.log("Hitting POST", req.body);
            res.json(result);
        })

        // const result = await collection.insertOne(user);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        // console.log(result);
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