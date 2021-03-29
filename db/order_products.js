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
        const {rows: [order_product]} = await client.query(`
            INSERT INTO order_products(${insertString})
            VALUES(${valuesString})
            RETURNING *;
        `, values)

        console.log(order_product)
    } catch (error) {
        throw error
    }
}

module.exports = {
    addProductToOrder
}