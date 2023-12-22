const express = require('express');
require('dotenv').config(); 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
  
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.y6otyph.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });



  const dbConnect = async () => {
    try {
  
        // <----------------------------------> //
       // <------ Database Collections ------> //
      // <----------------------------------> //
  
      const userTaskCollection = client.db('TargetDB').collection('userTaskCollection');


      app.get('/tasks', async(req, res) => {
        const email = req.query.email;
        const query = {email : email};
        const cursor = userTaskCollection.find(query);
        const result = await cursor.toArray();
        res.send(result)
      })

      
  
  
  
    // <---------------------------------------> //
   // <------ CRUD Operations Ends Here ------> //
  // <---------------------------------------> //
  
        await client.connect()
        console.log('Database Connected!')
    } catch (error) {
        console.log(error.name, error.message)
    }
  }
  dbConnect()
  
  app.get('/', (req, res) => {
  
    res.send('This the Server of Target Website')
  })
  
  
  app.listen(port, () => {
      console.log('the server is Running on ', port, 'port.');
  })