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
// const { getAllProducts } = require('./products');

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
        "imageURL" VARCHAR(255) DEFAULT 'https://i.pinimg.com/originals/36/ab/81/36ab81cd8d63cf7c4a08f39403698c77.jpg',
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
    console.log('creating db with Meg data!!')
    const productToCreate = [
     {
      id: 1,
      name: "Fender Vintera ‘60s Jazz Bass", 
      description:"The Fender Standard Jazz Bass has the classic offset, contoured alder body with standard pickups and controls for definitive J Bass sound. The maple neck has a modern C profile, comfortable gloss finish, maple fretboard, and 20 medium jumbo frets. Chrome-plated hardware.", 
      price: 1049, 
      imageURL:`https://cdn.shopify.com/s/files/1/0404/6032/0934/products/DSC_2177_fde5a29a-6bc0-490d-bd1c-b83f5c2ac318_800x.jpg?v=1597862308`, 
      inStock: true, 
      category: 'Bass guitars'
    },
    {
      id: 2,
      name:"Squier Vintage Modified ’70s Jazz Bass",
      description:"Bass '70s takes cosmetic details from a classic period of the J-Bass and rolls them up with modern electronics and playability. From funk to punk, the Vintage Modified Jazz Bass '70s provides exemplary tone and nods to its vintage roots with bound maple neck, striking block inlays and a pair of Fender-designed single coil pickups for a wealth of tonal possibilities. Great for the beginner bassist or the guitar player looking to add some low-end to their arsenal, the Vintage Modified Jazz Bass '70s represents an awesome value.",
      imageURL:`https://cdn.shopify.com/s/files/1/0916/0836/products/39640_2508040506_2_383x@3x.progressive.jpg?v=1571460528`,
      price: 280,
      inStock: true,
      category: "Bass guitars"
    },
    {
      id: 3,
      name: 'Schecter Stiletto Extreme Bass',
      description: `Schecter's ultra-playable Stiletto Extreme 4 solidbody bass guitar gives you an amazing playing experience. 
      From its gorgeous figured-maple top to its sustain-friendly mahogany body to its super-fast maple neck, the Stiletto Extreme 4 oozes attitude and tone. You'll love the pair of Schecter Diamond Bass pickups and the active electronics; this setup lets you conjure practically any kind of bass tone you want - and plenty of it. Top-grade components keep this bass in stable tune, for worry-free performance. You'll also appreciate the cool Vector inlays that grace the rosewood fingerboard. The Stiletto Extreme 4 is a class act!`,
      imageURL: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsVgjdNEfErB8qclzqk9QLKj3hah2407Tg7OX-GA2kZfzigB1yFQEfAtmSaTM&usqp=CAc`,
      price: 499,
      inStock: true,
      category: "Bass guitars"
    },
    {
      id: 4,
      name: 'Epiphone Thunderbird Classic Bass',
      description: `Take an iconic bass - the Epiphone Thunderbird Classic IV - and load it up with a pair of Gibson TB Plus humbucking pickups. What you end up with is an enhanced bass monster, perfect for fueling the low end of your most adventurous music productions. And with its 1960's Rounded Bass Profile neck and rosewood fingerboard, the Thunderbird Classic IV is a highly-playable beast indeed. The T-bird's beefy bottom and attitude-laden growl has graced innumerable hit records; now its your turn. 
      Plug in the Epiphone Thunderbird Classic IV bass and make some music history.`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVWsBfQDaWCNvdOrASrkY83REplzzB05iCtQ&usqp=CAU',
      price: 699,
      inStock: true,
      category: 'Bass guitars'
    },
  
    {
      id: 5,
      name:'American Acoustasonic® Stratocaster®',
      description: `The American Acoustasonic™ Stratocaster® continues to embody the spirit of purposeful innovation that drives Fender guitars. The power of the Fender and Fishman®-designed Acoustic Engine is sure to deliver true inspiration. From acoustic shapeshifting to electric rhythm tones, this extremely versatile guitar creates a brand-new lane on the sonic highway.`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkza2ZthE8xqF0ExQDpLzpEr_Akdx2EwzITg&usqp=CAU',
      price: 1999, 
      inStock: true,
      category:'guitars'
    },
    {
      id: 6,
      name:'Gibson ES-335- Sixties Cherry',
      description: `Description:The Gibson ES-335 DOT is the cornerstone of the Gibson ES line-up. From its inaugural appearance in 1958, the Gibson ES-335 set an unmatched standard. The pearloid dot inlay rosewood fingerboard on a hand-rolled Rounded "C" mahogany neck remind players where it all started. Gibson's Calibrated T-Type humbucking pickups are paired with our hand-wired control assembly. The result is that versatile Gibson ES tone that players have craved for over 60 years. Tuning stability and precise intonation are provided by the Vintage Deluxe tuners with Keystone buttons, paired with light weight Aluminum ABR-1 bridge and Stop Bar tailpiece, anchored by steel thumb-wheels and tailpiece studs`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzuBUcqGA66XqnOPOaATy6r_HF_h2ZjNHCw&usqp=CAU',
      price: 2999,
      inStock: true,
      category: 'guitars'
    },
    {
      id: 7,
      name:'Schecter Omen Extreme-6',
      description: `From brutalizing crunch to crystalline cleans, the Omen Extreme-6 has you covered. Its Diamond Plus humbucking pickups have tone and flexibility to go with the distance with you, stage to studio. Coil splitting is activated by a simple push-pull mechanism on the tone pot. Together with its 3-way selector, the Omen Extreme-6 offers you a total of six distinct pickup combinations for interacting with your music — from fusion to blues, and from rock to metal.`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwzJx-Gcvm6Am7y8irWca8soP1e-nlKnQlfbsp1M6bngMT4z5Q2Sn2wmE11wbhOgiLSn0&usqp=CAU',
      price: 449,
      inStock: true,
      category: 'guitars'
    },
    {
      id: 8,
      name: 'Gibson SG Standard',
      description: `Description:The Gibson SG Standard rocks the classic looks and features associated with the late 60's style SG models sought after by many. A rounded profile mahogany neck, bound rosewood fingerboard, long tenon 19th fret neck joint, and a solid mahogany body provide the backbone for singing sustain. The 490R and 490T Alnico II pickups provide the power to drive. A black, 5-ply, full-face pickguard set this SG Standard apart from others... a truly versatile classic.`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwVwLCzmtio-Ul_5AdE25wQf2GQIDgJthb_0M4KMKRqs_dHG0c0m7G3tYngjbsPG0Rs6c&usqp=CAU',
      price: 1499,
      inStock: true,
      category: 'guitars'
    },
    {
      id: 9,
      name: 'Korg Grandstage 88',
      description: `Description: The SP-280 switches between piano multisamples according to how loud or soft you play, providing an expressive, acoustic-like playing feel across the entire dynamic range. Whether you're playing ppp or fff, the piano will deliver a realistic response to your performance. Its "Grand Piano" sound, for example, reproduces the damper resonance that is heard when you press the damper pedal of a grand piano, making the SP-280 sound like a convincing acoustic piano.`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDyi6lUBFH0huX5szHdklmvQRdD703_RdVEA&usqp=CAU',
      price: 799,
      inStock: true,
      category: 'pianos and keyboards'
    },
    {
      id: 10,
      name: 'Roland RD-88',
      description: `Roland is on the cutting edge of evolving digital piano technology, and they’ve packed their latest stage piano, the RD-88, with renowned RD sound and playability in a lighter weight, more affordable instrument. For decades, pro keyboardists have trusted RD pianos have been trusted by professionals, gig after gig, on stages worldwide. Now, the RD-88 gives you the premium ivory feel of Roland’s PHA-4 Standard weighted action with escapement, along with their powerful next-generation ZEN-Core sound engine with SuperNATURAL acoustic and electric pianos. The interface, optimized for live performance, is quick and easy to use onstage with hands-on real-time controls and three zones with Apple MainStage integration. Amazingly, Roland has even built stereo speakers into the RD-88’s sleek chassis — incredibly handy for sketching out arrangements backstage!`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf35tarwYc6OgAj3OM584HpvxSMHL7ibvuWQ&usqp=CAU',
      price: 1299,
      inStock: true,
      category: 'pianos and keyboards'
    },
    {
      id: 11,
      name:'Casio PX-S3000',
      description: `Casio’s Privia digital pianos are renowned for their authentic playability and lifelike sound. Now the PX-S3000 brings a fresh new design to the Privia series, introducing smart technology into your musical life. With its sleek, glossy panel and unibody chassis, the PX-S3000 evokes a high-end acoustic grand in a svelte, modern design that’s not much larger than the keys themselves. The touch-sensor controls are revealed only after the power button is pressed and, they’re easy to see in any light. They fade away when powered off, leaving only a clean, seamless top panel. And thanks to Casio’s newly designed fully weighted Smart Scaled Hammer Action keyboard, the PX-S3000 provides uncompromising piano touch with a proprietary key scaling system that reproduces the characteristics of each of the 88 notes, while ebony and ivory key textures ensure confident, comfortable playing in any climate.`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfHGOE4snqPcczBYhXrH8vwqjg3nGATKKP4Q&usqp=CAU',
      price: 849,
      inStock: true,
      category: 'pianos and keyboards'
    },
    {
      id: 12,
      name: 'Fender Fullerton Jazzmaster Ukulele',
      description: `Tipping the hat to Fender’s iconic guitar body shapes, the Fullerton Series ukuleles are nothing short of electric. The Fullerton Jazzmaster departs from traditional ukulele construction and aesthetics, while remaining faithful to Fender’s history. The Jazzmaster ukulele’s pickguard, signature finish color options, and 4-in-line headstock can only be categorized as quintessentially Fender. The Fullerton Jazzmaster is the perfect choice for the ukulele player looking to inject the spirit of rock ’n roll into every performance.`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmudW_pWrD_ySXO7GJ8-xlc_Qk9IsmO6zlc_6iJb6qMVnjCx2lRkgnRfhUy8QxGI2Blmo&usqp=CAU',
      price: 199,
      inStock: true,
      category: 'ukuleles'
    },
    {
      id: 13,
      name: 'Lanikai ACST-B Acacia Baritone Ukulele',
      description: `The Lanikai ACST-B is a beautifully crafted baritone ukulele featuring a solid acacia top that delivers full, classic baritone uke tone. The ACST-B features a wider nut for a slightly wider neck that makes playing the ACST-B more comfortable. A gorgeous walnut fingerboard offers great response as well, whether you're chording or playing lead. A NuBone XB nut and saddle also provide tonal support to the already tone-rich acacia body. This baritone uke is ideal for living room jams or warm nights on the beach around a fire with friends. Uke enthusiasts here at Sweetwater love the ACST-B for its playability and tone.`,
      imageURL: 'https://cdn.shopify.com/s/files/1/0810/2125/products/lanikai-solid-acacia-top-baritone-ukulele-with-kula-preamp-acst-b-6323045269569_1024x_crop_bottom.jpg?v=1553178524',
      price: 279,
      inStock: true,
      category: 'ukuleles'
    },
    {
      id: 14,
      name: 'Oscar Schmidt OU57 Baritone Ukulele',
      description: `The Oscar Schmidt OU57 is a Baritone Ukulele that is a real treat to behold and play. Constructed of Spalted Mango, with classic designs and superior resonance, the Oscar Schmidt OU57 Ukelele is hand crafted for years of playing enjoyment. Smooth fret ends, low action, and a resonant body round out the great features of this stunning uke.`,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgm4RjkgR4UmkVSOagBZEfeOeRWsAthI-W2A&usqp=CAU',
      price: 249,
      inStock: true,
      category: 'ukuleles'
    }
    ];
   
    const products = await Promise.all(productToCreate.map(product => {
       return createProduct(product)
    }))
    console.log('populate products:', products)
    console.log('finished creating db with Megs products!!')
  } catch (error) {
    throw error
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
    // const order_product3 = {
    //   orderId: 2,
    //   productId: 5,
    //   price: 1500.0,
    //   quantity: 3
    // }

    await addProductToOrder(order_product)
    await addProductToOrder(order_product2)
    // await addProductToOrder(order_product3)
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
    await getAllOrders()
   
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