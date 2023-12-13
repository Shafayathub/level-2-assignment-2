import mongoose, { model } from 'mongoose';
import { TAddress, TFullname, TOrders, TUser } from './user.interface';

const { Schema } = mongoose;

const FullnameSchema = new Schema<TFullname>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const AddressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const OrdersSchema = new Schema<TOrders>(
  {
    productName: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  },
);

const UserSchema = new Schema<TUser>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  //   password: { type: String, required: true },
  fullname: { type: FullnameSchema },
  age: { type: Number, required: true },
  email: { type: String, unique: true, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String] },
  address: { type: AddressSchema, required: true },
  orders: { type: OrdersSchema },
});

// model
export const UserModel = model<TUser>('User', UserSchema);
