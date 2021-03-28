import axios from 'axios';

const BASE_URL = '/api';

export const products_url = `${BASE_URL}/products/`
export const users_url = `${BASE_URL}/users/`

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
  handleAccountForm
} from './users'