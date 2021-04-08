const client = require('./client')

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
      throw error 
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
const destroyProduct = async (id) => {
  try {
    await client.query(`
    DELETE FROM order_products
    WHERE id = $1
    `, [id])

    const { rows: [product] } = await client.query(`
    DELETE FROM products
    WHERE id=$1
    RETURNING *
    `, [id])

    return product
  } catch (error) {
    throw error
  }
}

const updateProduct = async(productToUpdate) => {
  const { id } = productToUpdate;
  delete productToUpdate.id;
  const setString = Obeject.keys(productToUpdate).map(
    (key, index) => `"${ key } = $${ index + 2 }`
  ).join(', ');

  try {
    if (setString.length > 0){
      const { rows: [product] } = await client.query(`
        UPDATE products
        SET ${ setString }
        WHERE id = $1 
        RETURNING *
      `, [id, ...Object.values(productToUpdate)])
      return product
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    destroyProduct, 
    updateProduct
}