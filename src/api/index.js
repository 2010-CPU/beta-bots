import axios from 'axios';

const BASE_URL = '/api';

export const products_url = `${BASE_URL}/products/`
export const users_url = `${BASE_URL}/users/`
export const order_url = `${BASE_URL}/orders/`

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
  fetchUser
} from './users'

export {
  fetchOrderById
} from './orders'