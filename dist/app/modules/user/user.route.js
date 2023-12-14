"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// post user
router.post('/', user_controller_1.Usercontrollers.createUser);
// get all users
router.get('/', user_controller_1.Usercontrollers.getAllUsers);
// get single user
router.get('/:userId', user_controller_1.Usercontrollers.getSingleUser);
// update a user
router.put('/:userId', user_controller_1.Usercontrollers.updateSingleUser);
// delete a user
router.delete('/:userId', user_controller_1.Usercontrollers.deleteSingelUser);
// orders
router.put('/:userId/orders', user_controller_1.Usercontrollers.updateAnOrder);
router.get('/:userId/orders', user_controller_1.Usercontrollers.getAllOrdersOfSingleUser);
router.get('/:userId/orders/total-price', user_controller_1.Usercontrollers.getTotalPrice);
exports.UserRouters = router;
