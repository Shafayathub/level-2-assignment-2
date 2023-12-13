"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const FullnameSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const AddressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
const OrdersSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true },
});
const UserSchema = new Schema({
    userId: { type: Number, unique: true, required: true },
    username: { type: String, required: true },
    //   password: { type: String, required: true },
    fullname: { type: FullnameSchema },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: AddressSchema, required: true },
    orders: { type: OrdersSchema },
});
