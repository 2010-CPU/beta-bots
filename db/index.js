// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'graceshopper'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
<<<<<<< HEAD
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

=======
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

    return product
  } catch (error) {
    console.log(error)  
  }
}


const getAllProducts = async () => {

  try {
    const { rows: products } = await client.query (`
    SELECT *
    FROM products
    `);

    return products;
    
  } catch (error) {

    throw error;
  }

}
>>>>>>> dev

// export
module.exports = {
  client,
  createProduct,
  // db methods
<<<<<<< HEAD
  createProduct
=======
  getProductById,
  getAllProducts
>>>>>>> dev
}