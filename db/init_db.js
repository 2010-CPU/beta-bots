// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping tables...")
    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS order_products
    `)


    // build tables in correct order
    console.log("Creating tables...")
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        "imageURL" TEXT DEFAULT "placeimg.com/1",
        "inStock" BOOLEAN DEFAULT false,
        category VARCHAR(255) NOT NULL
      );
    `)
    await client.query(`
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          "firstName" VARCHAR(255) NOT NULL,
          "lastName" VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          "imageURL" TEXT DEFAULT "placeimg.com/1",
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL,
          "isAdmin" BOOLEAN UNIQUE NOT NULL DEFAULT false
        );
    `)
    await client.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          status TEXT DEFAULT "created",
          "userId" INTEGER REFERENCES users(id),
          "datePlaced" DATE
        );
    `)

    await client.query(`
        CREATE TABLE order_products(
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          price INTEGER NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 0
        );
    `)

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());