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
  price: string;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  // password:string;
  fullname: TFullname;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders;
};
