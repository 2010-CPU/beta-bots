// Connect to DB
const { Client } = require('pg');
const productsRouter = require('../routes/products');
const DB_NAME = 'localhost:5432/graceshopper'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
const createProduct = async (productField) => {
  const { name, description, price, category } = productField;
  if (!name || !description || !price || !category) {
    throw new Error ("Product is missing information!")
  }
  const insertString = Object.keys(productField).join(", ")
  const sqlInsert = Object.keys(productField).map((key, index) => {
    return `$${index + 1}`
  }).join(", ")
  try {
      const { rows: [product] } = await client.query(`
          INSERT INTO products(${insertString})
          VALUES(${sqlInsert})
          RETURNING *;
      `, Object.values(productField));
      return product;
  } catch (error) {
      throw error
  };
};
const getProductById = async (id) => {
  try {
    const {rows: [product]} = await client.query(`
      SELECT *
      FROM products
      WHERE id = $1;
    `, [id])

    console.log(product)

    return product
  } catch (error) {
    console.log(error)  
  }
}
// export
module.exports = {
  client,
  createProduct,
  // db methods
  getProductById,
}