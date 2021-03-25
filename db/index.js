// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/graceshopper'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
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
  // db methods
  getProductById,
}