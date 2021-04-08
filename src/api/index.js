import axios from 'axios';

const BASE_URL = '/api';

export const products_url = `${BASE_URL}/products`
export const users_url = `${BASE_URL}/users`
export const orders_url = `${BASE_URL}/orders`
export const checkout_url = `${BASE_URL}/cart/checkout`
export const orderProducts_url = `${BASE_URL}/order_products`

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchAllProducts,
  fetchProductById
} from './products'

export {
  handleAccountForm,
  fetchUser,
  fetchOrdersByUserId
} from './users'

export {
  fetchOrderById,
  fetchCart,
  completeOrder,
  cancelOrder,
  addProductToOrder
} from './orders'

export {
  checkoutRequest
} from './checkout'

export {
  deleteProductFromOrder
} from './order_products'