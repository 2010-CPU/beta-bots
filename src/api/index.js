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
  fetchProductById,
  createProduct,
  destroyProduct
} from './products'

export {
  handleAccountForm,
  fetchUser,
  fetchOrdersByUserId,
  fetchAllUsers,
  fetchUserById,
  updateUser,
  adminCreateUser
} from './users'

export {
  fetchOrderById,
  fetchCart,
  completeOrder,
  cancelOrder,
  addProductToOrder,
  createOrder,
  getOrdersByUser
} from './orders'

export {
  checkoutRequest
} from './checkout'

export {
  deleteProductFromOrder,
  updateOrderProduct
} from './order_products'