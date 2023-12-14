import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    const zodParsedUserData = UserValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(zodParsedUserData);

    const {
      userId,
      username,
      fullname,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = result;

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: {
        userId,
        username,
        fullname,
        age,
        email,
        isActive,
        hobbies,
        address,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went worng.',
      data: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went worng.',
      data: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = parseInt(userId);

  try {
    const result = await UserServices.getSingleUserFromDB(id);
    if (result !== null) {
      return res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const Usercontrollers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
