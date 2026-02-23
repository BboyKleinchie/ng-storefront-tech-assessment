import { Category } from '../../types/category.type';

export interface NewCartRequest {
  id: number;
  userId: number;
  products: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    quantity?: number;
  }[];
}
