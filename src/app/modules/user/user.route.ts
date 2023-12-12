import express from 'express';
import { Usercontrollers } from './user.controller';

const router = express.Router();

router.post('/', Usercontrollers.createUser);

export const UserRouters = router;
