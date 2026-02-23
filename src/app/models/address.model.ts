import { GeoLocation } from './geolocation.model';

export interface Address {
  geolocation: GeoLocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}
