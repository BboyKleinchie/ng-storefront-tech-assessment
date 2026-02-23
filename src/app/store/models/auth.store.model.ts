import { StoreState } from './store.model';

export type AuthStore = StoreState & {
  token: string | null;
  error: string | null;
}
