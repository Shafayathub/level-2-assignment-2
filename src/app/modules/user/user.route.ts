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

export const UserRouters = router;
