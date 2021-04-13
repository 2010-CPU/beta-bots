// code to build and initialize DB goes here
const client = require('./client')

const {
  createProduct,
  getAllProducts,
  createUser,
  getAllUsers,
  createOrder,
  addProductToOrder,
  getAllOrders
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping tables...")
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)


    // build tables in correct order
    console.log("Creating tables...")
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price FLOAT(2) NOT NULL,
        "imageURL" VARCHAR(255) DEFAULT 'https://placeimg.com/300/300/any',
        "inStock" BOOLEAN DEFAULT false,
        category VARCHAR(255) NOT NULL
      );
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" VARCHAR(255) DEFAULT 'https://placeimg.com/100/100/people',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      );
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'created',
        "userId" INTEGER REFERENCES users(id),
        "datePlaced" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price FLOAT(2) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0
      );
    `)

  } catch (error) {
    throw error;
  }
}
const populateUsers = async () => {
  try {
    console.log("Creating user data......!!!")
    const dummyUser1 = {
      firstName: "Bob",
      lastName: "Dylan",
      email: "bobbyDyall@gmail.com",
      username: "bobdylan",
      password: "bobdylan68"
    }
    const dummyUser2 = {
      firstName: "Cage",
      lastName: "The-Elephant",
      email: "aintnorestforthewicked@gmail.com",
      username: "cage890",
      password: "elephant"
    }
    const user1 = await createUser(dummyUser1)
    const user2 = await createUser(dummyUser2)
    const allUsers = await getAllUsers()
    console.log("Here's our users!!!!!!", allUsers)
  } catch (error) {
    throw error
  }
} 

const populateProducts = async () => {
  try {
    // create useful starting data
    console.log("Creating dumming products.....!")
    const dummyProduct1 = {
      name: "guitar",
      price: 10.50,
      description: "This is a funky guitar",
      category: "strings"
    }
    const dummyProduct2 = {
      name: "piano",
      price: 500.50,
      description: "This is a cool piano",
      category: "tech"
    }
    const dummyProduct3 = {
      name: "drums",
      price: 1000.55,
      description: "This is a neat drumset",
      category: "drums"
    }
    const dummyProduct4 ={
      name: "cowbell",
      price: .99,
      description: "We need more cowbell",
      category: "percussion"
    }
    const dummyProduct5 = {
      name: "ukulele",
      price: 500,
      description: "The perfect ukulele for beginners and professionals",
      category: "strings"
    }

    const product1 = await createProduct(dummyProduct1)
    const product2 = await createProduct(dummyProduct2)
    const product3 = await createProduct(dummyProduct3)
    const product4 = await createProduct(dummyProduct4)
    const product5 = await createProduct(dummyProduct5)
    const allProducts = await getAllProducts()
    console.log("Here's all our products!:", allProducts)
  } catch (error) {
    throw error;
  }
}

const populateOrders = async () => {
  try {
    console.log("Creating orders...")
    const order = {
      userId: 1
    }
    const order2 = {
      userId: 2,
      status: "completed"
    }
    const order3 = { 
      userId: 3,
      status: "cancelled"
    }
    await createOrder(order)
    await createOrder(order2)
    await createOrder(order3)
    console.log("Finished orders!")
  } catch (error) {
    throw error;
  }
}

const populateOrderProducts = async () => {
  try {
    console.log("Creating products to order...")
    const order_product = {
      orderId: 1,
      productId: 3,
      price: 1000.55,
      quantity: 1
    }
    const order_product2 = {
      orderId: 1,
      productId: 2,
      price: 1501.5,
      quantity: 3
    }
    const order_product3 = {
      orderId: 2,
      productId: 5,
      price: 1500.0,
      quantity: 3
    }

    await addProductToOrder(order_product)
    await addProductToOrder(order_product2)
    await addProductToOrder(order_product3)
    console.log("Finished products to order!")
  } catch (error) {
    throw error;
  }
}

const seedAdminUsers = async () => {
  const sal = {
    firstName: 'sal',
    lastName: 'guerrero',
    email: 'sal@gmail.com',
    imageURL: 'https://placeimg.com/100/100/people',
    username: 'lol',
    password: 'lol',
    isAdmin: true
  }
  try {
    const admin = await createUser(sal)
    const order = await createOrder({userId: admin.id})
    console.log(admin, order)
  } catch (error) {
    throw error
  }
}

async function populateInitialData() {
  try {

    await seedAdminUsers()
    await populateProducts()
    await populateUsers()
    await populateOrders()
    await populateOrderProducts()
    const orders = await getAllOrders()
   
  } catch(error) {
    throw error
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  buildTables,
  populateInitialData
}