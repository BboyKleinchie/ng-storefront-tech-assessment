import { StoreState } from './store.model';
import { Cart } from '../../models/cart.model';

export type CartStore = StoreState & {
  carts: Cart[],
  cart: Cart | null,
  cartAdded: Cart | null,
  cartUpdated: Cart | null
}
