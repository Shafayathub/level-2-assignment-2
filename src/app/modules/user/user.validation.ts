import { z } from 'zod';

const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: "can't be more than 20 characters" })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be in capitalized format',
      },
    ),
  lastName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: "can't be more than 20 characters" })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be in capitalized format',
      },
    ),
});

const AddressValidationSchema = z.object({
  street: z
    .string()
    .min(1, { message: 'Street is required.' })
    .max(100)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
    ),
  city: z
    .string()
    .min(1, { message: 'City is required.' })
    .max(100, {
      message:
        'I know your city name is less than 88 Characters. ;-D search on google :P',
    })
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
    ),
  country: z.string().min(1, { message: 'COuntry is required' }).max(180, {
    message:
      'Acoording to google the longest country name takes 168 Alphabets. I gave you 180 characters limit ;P',
  }),
});

const OrdersValidationSchema = z.object({
  productName: z.string().min(1, { message: "Don't be like Evaly man. :D" }),
  price: z
    .string()
    .min(1, { message: 'Yeah this is business and you miss the price.' }),
  quantity: z
    .number()
    .gt(0, { message: 'At least he bought 1 product, you remember!' }),
});

// Main validation Schema
export const UserValidationSchema = z.object({
  userId: z.number().gte(0),
  username: z.string().trim().min(1, { message: 'User name is required.' }),
  password: z.string().min(6),
  fullname: FullNameValidationSchema,
  age: z.number().gt(5),
  email: z.string().email({ message: 'Email is required' }),
  isActive: z.boolean(),
  hobbies: z.string().array().optional(),
  address: AddressValidationSchema,
  orders: OrdersValidationSchema.optional(),
});
