import express from 'express';
import { Usercontrollers } from './user.controller';

const router = express.Router();

// post user
router.post('/', Usercontrollers.createUser);

// get all users
router.get('/', Usercontrollers.getAllUsers);

// get single user
router.get('/:userId', Usercontrollers.getSingleUser);

// update a user
router.put('/:userId', Usercontrollers.updateSingleUser);

// delete a user
router.delete('/:userId', Usercontrollers.deleteSingelUser);

// orders
router.put('/:userId/orders', Usercontrollers.updateAnOrder);

router.get('/:userId/orders', Usercontrollers.getAllOrdersOfSingleUser);

router.get('/:userId/orders/total-price', Usercontrollers.getTotalPrice);

export const UserRouters = router;
