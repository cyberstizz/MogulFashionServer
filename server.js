const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');


const app = express();

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
app.get('/product/:category/:id', async (req, res) => {



    try {
        const product = await db.collection('newProducts').findOne({
            _id: new ObjectId(req.params.id),
            category: req.params.category
        });
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        console.error(err); // This will print the error details to your server logs
        res.status(500).send('Error retrieving product');
    }
});

// Add product (Note: you shouldn't need the ':product' parameter in the path)
app.post('/add', async (req, res) => {
    const result = await db.collection('newProducts').insertOne(req.body);
    res.json(result);
});

// Delete product by ID
app.delete('/delete/:id', async (req, res) => {
    console.log('I am delete and I have been called')
    const result = await db.collection('newProducts').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
});

// Edit product by ID
app.put('/update/:id', async (req, res) => {
    console.log('I am the update component and I have been called')
    const result = await db.collection('newProducts').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.json(result);
});

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


  app.get('/', async (req, res) => {
    res.send('this thing is working!')
})

app.post('/verifyPassword', async (req, res) => {
    const { password } = req.body;

    try {
        const passwordData = await db.collection('passwords').findOne({});
        if (password === passwordData.passwordData.currentPassword) {
            res.status(200).json({ verified: true });
        } else {
            res.status(401).json({ verified: false, message: 'Incorrect password.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while verifying the password.' });
    }
});


app.post('/changePassword', async (req, res) => {
    const { tempPassword, newPassword } = req.body;

    try {
        const passwordData = await db.collection('passwords').findOne({});
        if (tempPassword === passwordData.passwordData.temporaryPassword) {
            await db.collection('passwords').updateOne({}, {
                $set: { 'passwordData.currentPassword': newPassword, 'passwordData.temporaryPassword': '' } // Clear the temporary password after it's used
            });
            res.status(200).json({ message: 'Password changed successfully.' });
        } else {
            res.status(401).json({ error: 'Incorrect temporary password.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while changing the password.' });
    }
});



const port = process.env.PORT || 4000;


app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
