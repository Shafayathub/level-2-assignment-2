import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidationSchema } from './user.validation';
import { TOrders } from './user.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParsedUserData = UserValidationSchema.parse(req.body);
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

const updateSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = parseInt(userId);

  try {
    const result = await UserServices.updateSingleUserFromDB(id, req.body);
    if (result !== null) {
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
      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
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

const deleteSingelUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = parseInt(userId);
  try {
    const result = await UserServices.deleteSingelUserFromDB(id);
    if (result !== null) {
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
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

// orders
const updateAnOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = parseInt(userId);
  try {
    const result = await UserServices.updateOdersOfSingleUserFromDB(
      id,
      req.body,
    );
    if (result !== null) {
      return res.status(200).json({
        success: true,
        message: 'Order updated successfully',
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

const getAllOrdersOfSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = parseInt(userId);

  try {
    const result = await UserServices.getAllOrdersOfSingleUserFromDB(id);
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

const getTotalPrice = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const id = parseInt(userId);

  try {
    const result = await UserServices.getTotalPriceFromDB(id);
    if (result !== null) {
      let totalPrice = 0;
      const totalArray: number[] = result[0].orders?.map(
        (e: TOrders) => e?.price * e?.quantity,
      );
      totalArray.forEach((e) => (totalPrice += e));

      return res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: { totalPrice },
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
  updateSingleUser,
  deleteSingelUser,
  updateAnOrder,
  getAllOrdersOfSingleUser,
  getTotalPrice,
};
