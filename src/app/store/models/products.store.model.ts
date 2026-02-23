import { Product } from '../../models/product.model';
import { StoreState } from './store.model';

export type ProductsStore = StoreState & {
  products: Product[],
  productDetails: Product | null
}
