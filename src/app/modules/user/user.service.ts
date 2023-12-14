import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const query = {};
  const result = await UserModel.find(query, {
    _id: 0,
    password: 0,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if ((await UserModel.isUserExists(userId)) === null) {
    return;
  }
  const result = await UserModel.findOne({ userId }, { _id: 0, password: 0 });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
