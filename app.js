const https = require("https");
const fs = require("fs");
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { MongoClient } = require('mongodb');
const mongo = require('mongodb');

/* 
 * Routes 
 */

/* WIMS */
app.get('/wim', async (req, res) => {
  const filter = {};
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017/',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db('ndk').collection('wims');
  const cursor = coll.find(filter);
  const result = await cursor.toArray();
  await client.close();


  //res.send('WIM API')
  res.json(result);
})

app.get('/wim/:id', async (req, res) => {

  const o_id = new mongo.ObjectId(req.params.id)
  const filter = {"_id":o_id};
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017/',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db('ndk').collection('wims');
  const cursor = coll.find(filter);
  const result = await cursor.toArray();
  await client.close();


  //res.send('WIM API')
  res.json(result);

  //res.send(`Details for ${req.params.id}`)
})

app.get('/wim/:id/download', (req,res) => {
  res.send(`Download for ${req.params.id}`)
})

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(3000, () => {
    console.log(`API URI: https://127.0.0.1:${port}`);
  });