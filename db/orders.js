const client = require('./client')

const formatOrders = (orders, id) => {
    const formattedOrders = orders.reduce((orderAgg, order) => {
        const {id, status, datePlaced, userId, total, quantity, 
            productId, name, description, price, imageURL, inStock, category, orderProductId} = order
        const product = {
            id: productId,
            name,
            description,
            price,
            imageURL,
            inStock,
            category,
            orderProductId,
            quantity,
            total
        }
        if(!orderAgg[id]) {
           orderAgg[id] = {
               id,
               status,
               datePlaced,
               userId,
               products: productId ? [product] : [],
               orderTotal: product.total
           }
        } else {
            if(productId) {
                orderAgg[id].products.push(product)
                orderAgg[id].orderTotal += product.price
                orderAgg[id].orderTotal = Number(orderAgg[id].orderTotal.toFixed(2))
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
            order_products.price AS total, order_products.quantity, order_products."productId", order_products.id AS "orderProductId",
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
            order_products.price AS total, order_products.quantity, order_products."productId", order_products.id AS "orderProductId",
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
        const userOrders = orders.filter(order => {
           return order.userId === Number(id)
        })
        return userOrders
    } catch (error) {
        throw error
    }
}

const getOrdersByProduct = async ({id}) => {
    try {
        const orders = await getAllOrders()
        return orders.filter(order => {
            return order.products.some(product => product.id === Number(id))
        })
    } catch (error) {
        throw error
    }
}

const getCartByUser = async ({id}) => {
    try {
        const orders = await getOrdersByUser({id: Number(id)})
        return orders.find(order => order.status === "created")
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

        return order
    } catch (error) {
        throw error
    }
}


const updateOrder = async(orderToUpdate) => {
    const {id} = orderToUpdate;
    delete orderToUpdate.id;
    const setString = Object.keys(orderToUpdate);
    const changeStrings = setString.map((key, index) => {
        return `"${key}" = $${index + 2}`
    }).join(", ");

    try {
        const {rows: [order]} = await client.query(`
        UPDATE orders
        SET ${changeStrings}
        WHERE id = $1
        RETURNING *;
        `, [id, ...Object.values(orderToUpdate)]);

        return order;

    } catch (error) {
        throw error;
    }
}



const completeOrder = async (id) => {
    try {
        const {rows: [order]} = await client.query(`
        UPDATE orders
        SET status = 'completed'
        WHERE id = $1;
        `, [id]);
        
        return order;

    } catch (error) {
        throw error;
    }
};


const cancelOrder = async (id) => {
    try {
        const {rows: [order]} = await client.query(`
        UPDATE orders
        SET status = 'cancelled'
        WHERE id= $1
        RETURNING *;
        `, [id]);

        return order;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    getCartByUser,
    getOrdersByProduct,
    getOrdersByUser,
    completeOrder,
    updateOrder,
    cancelOrder
}