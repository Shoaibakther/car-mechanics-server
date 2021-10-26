const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middle order 
app.use(cors())
app.use(express.json())

// O6BG5mStp5OcZ6jD  password
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m7jsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('carMechanic');
        const servicesCollection = database.collection('services');

// post api 
        app.post('/services', async (req, res) => {
            const service = req.body;
        //     const service = {
        //         "name": "ENGINE DIAGNOSTIC",
        // "price": "300",
        // "description": "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
        // "img": "https://i.ibb.co/dGDkr4v/1.jpg"
        //     }
            const result = await servicesCollection.insertOne(service)
        //     console.log(result);
            res.json(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Running genius server')
})
app.listen(port, () => {
    console.log('Running genius server on port', port);
})