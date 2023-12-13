import express from 'express';
import { Usercontrollers } from './user.controller';

const router = express.Router();

// post user
router.post('/', Usercontrollers.createUser);

// get all users
router.get('/', Usercontrollers.getAllUsers);

export const UserRouters = router;
