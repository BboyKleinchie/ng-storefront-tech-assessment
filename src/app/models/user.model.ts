import { Address } from './address.model';
import { UserName } from './user-name.model';

export interface User {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserName;
  phone: string;
}
