const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Replace the URI string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://walmartcream:$ucce$$7@cluster0.qu696.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});




let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('mogulFashion');
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
}

// Connect to the database when the app starts
connectToDatabase();

app.get('/newProducts', (req, res) => {
    db.collection('newProducts').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



app.get('/', async (req, res) => {
    res.send('this thing is working!')
})



// All products
app.get('/products', async (req, res) => {
    if(!db) {
        return res.status(500).send('Database not initialized');
    }

    const products = await db.collection('newProducts').find().toArray();
    res.json(products);
});

// List of products by category
app.get('/category/:category', async (req, res) => {
    if(!db) {
        return res.status(500).send('Database not initialized');
    }

    console.log('I am about to send all products from the specified category')
    const products = await db.collection('newProducts').find({ category: req.params.category }).toArray();
    res.json(products);
});

// Single product by ID and category
app.get('/:category/:id', async (req, res) => {
    const product = await db.collection('newProducts').findOne({ _id: ObjectID(req.params.id), category: req.params.category });
    res.json(product);
});

// Add product (Note: you shouldn't need the ':product' parameter in the path)
app.post('/add', async (req, res) => {
    const result = await db.collection('newProducts').insertOne(req.body);
    res.json(result);
});

// Delete product by ID
app.delete('/delete/:id', async (req, res) => {
    const result = await db.collection('newProducts').deleteOne({ _id: ObjectID(req.params.id) });
    res.json(result);
});

// Edit product by ID
app.put('/update/:id', async (req, res) => {
    const result = await db.collection('newProducts').updateOne({ _id: ObjectID(req.params.id) }, { $set: req.body });
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
