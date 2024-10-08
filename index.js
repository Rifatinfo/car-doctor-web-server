const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; // Port set to 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()
// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejjfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// Routes
app.get('/', (req, res) => {
  res.send('Car Doctor server is running!');
});

// Start server
app.listen(port, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Car Doctor server running on port ${port}`);
  }
});
