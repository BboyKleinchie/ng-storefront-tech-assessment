import { User } from '../../models/user.model';
import { StoreState } from './store.model';

export type UsersStore = StoreState & {
  users: User[];
  user: User | null;
  newUserId: number | null;
}
