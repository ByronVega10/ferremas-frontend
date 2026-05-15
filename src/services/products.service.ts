import api from '@/lib/axios';
import { Product } from '@/types/product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');

  return response.data;
};