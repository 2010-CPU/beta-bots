const client = require('./client')

const formatOrders = (orders, id) => {
    const formattedOrders = orders.reduce((orderAgg, order) => {
        const {id, status, datePlaced, userId, total, quantity, 
            productId, name, description, price, imageURL, inStock, category} = order
        const product = {
            id: productId,
            name,
            description,
            price,
            imageURL,
            inStock,
            category,
            quantity,
            total
        }
        if(!orderAgg[id]) {
           orderAgg[id] = {
               id,
               status,
               datePlaced,
               userId,
               products: productId ? [product] : []
           }
        } else {
            if(productId) {
                orderAgg[id].products.push(product)
            }
        }
        return orderAgg
    }, {})
    if(id) {
        return formattedOrders[id]
    } else {
        return formattedOrders
    }
}

const getOrderById = async (id) => {
    try {
        const {rows: order} = await client.query(`
            SELECT 
            orders.id, orders.status, orders."datePlaced", orders."userId",
            order_products.price AS total, order_products.quantity, order_products."productId",
            products.name, products.description, products.price, products."imageURL", products."inStock", products.category
            FROM orders
            LEFT JOIN order_products
            ON order_products."orderId" = orders.id
            LEFT JOIN products
            ON products.id = order_products."productId"
            WHERE orders.id = $1;
        `, [id])
        
        return formatOrders(order, id)
    } catch (error) {
        throw error
    }
}

const getAllOrders = async () => {
    try {
        const {rows: order} = await client.query(`
            SELECT 
            orders.id, orders.status, orders."datePlaced", orders."userId",
            order_products.price AS total, order_products.quantity, order_products."productId",
            products.name, products.description, products.price, products."imageURL", products."inStock", products.category
            FROM orders
            LEFT JOIN order_products
            ON order_products."orderId" = orders.id
            LEFT JOIN products
            ON products.id = order_products."productId";
        `)
        
        return Object.values(formatOrders(order, null))
    } catch (error) {
        throw error
    }
}

const getOrdersByUser = async ({id}) => {
    try {
        const orders = await getAllOrders()
        return orders.filter(order => order.userId === id)
    } catch (error) {
        throw error
    }
}

const getOrdersByProduct = async ({id}) => {
    try {
        const orders = await getAllOrders()
        return orders.filter(order => {
            return order.products.some(product => product.id === id)
        })
    } catch (error) {
        throw error
    }
}

const getCartByUser = async ({id}) => {
    try {
        const orders = await getOrdersByUser({id})
        return orders.filter(order => order.status === "created")
    } catch (error) {
        throw error
    }
}

const createOrder = async (order) => {

    const {userId} = order

    if(!userId) {
        throw new Error("This order requires a user.")
    }

    const insertString = Object.keys(order).map(key => {
        return `"${key}"`
    }).join(', ')

    const valuesString = Object.keys(order).map((key, index)=> {
        return `$${index + 1}`
    }).join(', ')

    const values = Object.values(order)
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders(${insertString})
            VALUES (${valuesString})
            RETURNING *;
        `, values)

        console.log(order)

        return order
    } catch (error) {
        throw error
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    getCartByUser,
    getOrdersByProduct,
    getOrdersByUser
}