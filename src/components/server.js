const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use cors middleware with default options
app.use(cors());

// Configure Sequelize to use SQLite as the database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'products.db',
});

// Define Product model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dateOfSale: DataTypes.STRING(20),
  productTitle: DataTypes.STRING(200),
  productDescription: DataTypes.STRING(500),
  productPrice: DataTypes.FLOAT,
  category: DataTypes.STRING(100),
  status: DataTypes.STRING(20),
});

// Create table if not exists
sequelize.sync();

// Initialize the database with seed data
app.get('/init', async (req, res) => {
  // Check if the database is already initialized
  const existingProducts = await Product.findAll();
  if (existingProducts.length > 0) {
    return res.send('Database already initialized');
  }

  try {
    // Fetch data from the third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    // Insert data into the database
    await Product.bulkCreate(data);

    return res.send('Database initialized successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
