import mongoose, { model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  IUserModel,
  TAddress,
  TFullname,
  TOrders,
  TUser,
} from './user.interface';
import config from '../../config';

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
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  },
);

const UserSchema = new Schema<TUser, IUserModel>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: FullnameSchema },
  age: { type: Number, required: true },
  email: { type: String, unique: true, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String] },
  address: { type: AddressSchema, required: true },
  orders: { type: [OrdersSchema] },
  isDeleted: { type: Boolean, default: false },
});

// executes before saving data on DB
UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
});

// Query middleware
UserSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a static method
UserSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};

UserSchema.statics.isUserNameExists = async function (username: string) {
  const existingUserName = await UserModel.findOne({ username });
  return existingUserName;
};

// model
export const UserModel = model<TUser, IUserModel>('User', UserSchema);
