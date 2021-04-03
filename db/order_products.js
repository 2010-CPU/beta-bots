const client = require('./client')

const addProductToOrder = async (order_product) => {

    const {orderId, productId, price} = order_product

    if(!orderId || !productId || !price) {
        throw new Error("Must have orderId, productId, and price.")
    }

    const insertString = Object.keys(order_product).map(key => {
        return `"${key}"`
    }).join(', ')

    const valuesString = Object.keys(order_product).map((key, index)=> {
        return `$${index + 1}`
    }).join(', ')

    const values = Object.values(order_product)

    try {
        const {rows: [ order_product ]} = await client.query(`
            INSERT INTO order_products(${insertString})
            VALUES(${valuesString})
            RETURNING *;
        `, values)
       
    } catch (error) {
        throw error
    }
}

const getOrderProductById = async (id) => {
    try {
        const { rows: [ order_product ] } = await client.query (`
            SELECT *
            FROM order_products
            WHERE id = $1;
        `, [id])

        return order_product;
    } catch (error) {
        throw error
    }
}

const updateOrderProduct = async ({id, ...fields}) => {

    const setString = Object.keys(fields).map ((columnName, index) => {
        return `"${columnName}" = $${index + 2}`
    }).join(", ")
    
    try {                 
            const { rows: [ order_product ] } = await client.query(`
                UPDATE order_products
                SET ${setString}
                WHERE id = $1
                RETURNING *; 
                `, [id, ...Object.values(fields)]
            )
            
            return order_product         
    } catch (error) {
        throw error
    }
}

const destroyOrderProduct = async (id) => {
    try {
        const { rows: [ deletedOrderProduct ] } = await client.query (`
            DELETE FROM order_products
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return deletedOrderProduct;

    } catch (error) {
        throw error
    }
}

module.exports = {
    addProductToOrder,
    getOrderProductById,
    updateOrderProduct,
    destroyOrderProduct
}