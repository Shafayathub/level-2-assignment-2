"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const FullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, { message: 'First name is required' })
        .max(20, { message: "can't be more than 20 characters" })
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value, {
        message: 'First name must be in capitalized format',
    }),
    lastName: zod_1.z
        .string()
        .min(1, { message: 'First name is required' })
        .max(20, { message: "can't be more than 20 characters" })
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value, {
        message: 'First name must be in capitalized format',
    }),
});
const AddressValidationSchema = zod_1.z.object({
    street: zod_1.z
        .string()
        .min(1, { message: 'Street is required.' })
        .max(100)
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value),
    city: zod_1.z
        .string()
        .min(1, { message: 'City is required.' })
        .max(100, {
        message: 'I know your city name is less than 88 Characters. ;-D search on google :P',
    })
        .refine((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value),
    country: zod_1.z.string().min(1, { message: 'COuntry is required' }).max(180, {
        message: 'Acoording to google the longest country name takes 168 Alphabets. I gave you 180 characters limit ;P',
    }),
});
const OrdersValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: "Don't be like Evaly man. :D" }),
    price: zod_1.z
        .string()
        .min(1, { message: 'Yeah this is business and you miss the price.' }),
    quantity: zod_1.z
        .number()
        .gt(0, { message: 'At least he bought 1 product, you remember!' }),
});
// Main validation Schema
exports.UserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().gte(0),
    username: zod_1.z.string().trim().min(1, { message: 'User name is required.' }),
    password: zod_1.z.string().min(6),
    fullname: FullNameValidationSchema,
    age: zod_1.z.number().gt(5),
    email: zod_1.z.string().email({ message: 'Email is required' }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.string().array().optional(),
    address: AddressValidationSchema,
    orders: OrdersValidationSchema.optional(),
});
