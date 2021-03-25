// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/graceshopper'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
const createProduct = async (product) => {
  
  const {name, description, price, category} = product
  
  if(!name || !description || !price || !category) {
    throw new Error("Product missing information")
  }

  const columnsToUpdate = Object.keys(product).map(
    key => key
  ).join(', ')

  const safeInsertionString = Object.keys(product).map((key, index) => {
    return `$${index + 1}`
  }).join(', ') 

  const valuesToAppend = Object.values(product)
  try {
    const {rows: [createdProduct]} = await client.query(`
      INSERT INTO products(${columnsToUpdate})
      VALUES (${safeInsertionString})
      RETURNING *;
    `, valuesToAppend)

    return createdProduct
  } catch (error) {
    throw error
  }
}


// export
module.exports = {
  client,
  // db methods
  createProduct
}