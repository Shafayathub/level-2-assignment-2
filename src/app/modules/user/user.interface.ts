import { Model } from 'mongoose';

export type TFullname = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullname;
  age: number;
  email: string;
  isActive: boolean;
  hobbies?: string[];
  address: TAddress;
  orders?: TOrders[];
  isDeleted: boolean;
};

// static method
export interface IUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<TUser | null>;
}
