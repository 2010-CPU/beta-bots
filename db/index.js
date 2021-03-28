// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'graceshopper'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);
const bcrypt = require('bcrypt');

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
const createUser = async ({firstName, lastName, email, username, password}) => {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
    const { rows: [user] } = await client.query(`
    INSERT INTO users("firstName", "lastName", email, username, password)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `, [firstName, lastName, email, username, hashedPassword]);
    delete user.password
    return user
  } catch (error) {
    throw error;
  }
}

const getUser = async ({username, password}) => {
  try {
    const user = await getUserByUsername(username);
 if (!user){
   throw new Error ("No user by that username!")
 } else {
   const hashedPassword = user.password;
   const passwordsMatch = await bcrypt.compare(password, hashedPassword);
   
   if(passwordsMatch){
     delete user.password
     return user
   }
 }
  } catch (error) {
    throw error
  }

}
const getUserByUsername = async(username) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1;
    `, [username])

    return user
  } catch (error) {
    throw error
  }
};

const getAllUsers = async() => {
  try {
    const { rows: users } = await client.query(`
      SELECT 
        users.id,
        users."firstName",
        users."lastName",
        users.email,
        users."imageURL",
        users.username,
        
        users.password,
        users."isAdmin"
      FROM users;
    `)
    return users
  } catch (error) {
    throw error
  }
}

const getUserById = async(id) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1;
    `, [id]);
    delete user.password
    return user
  } catch (error) {
    throw error
  }
}
  // export
module.exports = {
  client,
  createProduct,
  getProductById,
  getAllProducts,
  createUser,
  getUserByUsername,
  getUser,
  getAllUsers,
  getUserById
}