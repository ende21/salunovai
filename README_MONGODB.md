# MongoDB Connection Example

This example shows how to connect to MongoDB Atlas using Node.js and the official MongoDB driver.

## Connection Code
```js
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>.9om3xo0.mongodb.net/?appName=Cluster0";

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
    // Connect the client to the server (optional starting in v4.7)
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
```

## Steps to Use
1. Install dependencies:
   ```bash
   npm install mongodb
   ```
2. Copy the code above into a file (e.g., `test-mongo.js`).
3. Replace the URI with your own credentials if needed.
4. Run the file:
   ```bash
   node test-mongo.js
   ```

## Notes
- Make sure your MongoDB Atlas cluster is running and accessible.
- The URI should match your cluster's connection string from the Atlas dashboard.
- You can change the database name in `client.db("admin")` as needed.
