import { Category } from '../types/category.type';
import { Rating } from './rating.model';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: Rating;
}
