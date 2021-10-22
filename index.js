const express = require("express");
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// user: mongodbAtlasUser1
// pass: tuJS4gQn3g99EcFs


const uri = "mongodb+srv://mongodbAtlasUser1:tuJS4gQn3g99EcFs@cluster0.sydng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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


app.get('/', (req, res) => {
    res.send("CRUD");
})

app.listen(port, () => {
    console.log("Running Server on Port: ", port);
})