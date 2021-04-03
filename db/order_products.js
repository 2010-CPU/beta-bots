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

        console.log(order_product)
    } catch (error) {
        throw error
    }
}

const getOrderProductById = async (id) => {
    try {
        const { rows: [ order_products ] } = await client.query (`
            SELECT *
            FROM order_products
            WHERE id = $1;
        `, [id])

        return order_products;
    } catch (error) {
        throw error
    }
}

const updateOrderProduct = async ({id, price, quantity}) => {
    
    try {                 
            const { rows: [ order_product ] } = await client.query(`
                UPDATE order_products
                SET price = $1, quantity = $2
                WHERE id = $3
                RETURNING *; 
                `, [price, quantity, id]
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