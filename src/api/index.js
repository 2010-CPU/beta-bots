import axios from 'axios';

const BASE_URL = '/api';

export const products_url = `${BASE_URL}/products/`

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  fetchAllProducts
} from './products'