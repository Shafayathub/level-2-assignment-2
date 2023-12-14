"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usercontrollers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodParsedUserData = user_validation_1.UserValidationSchema.parse(req.body);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedUserData);
        const { userId, username, fullname, age, email, isActive, hobbies, address, } = result;
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went worng.',
            data: err,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went worng.',
            data: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const id = parseInt(userId);
    try {
        const result = yield user_service_1.UserServices.getSingleUserFromDB(id);
        if (result !== null) {
            return res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                data: result,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const id = parseInt(userId);
    try {
        const result = yield user_service_1.UserServices.updateSingleUserFromDB(id, req.body);
        if (result !== null) {
            const { userId, username, fullname, age, email, isActive, hobbies, address, } = result;
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
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const deleteSingelUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const id = parseInt(userId);
    try {
        const result = yield user_service_1.UserServices.deleteSingelUserFromDB(id);
        if (result !== null) {
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
// orders
const updateAnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const id = parseInt(userId);
    try {
        const result = yield user_service_1.UserServices.updateOdersOfSingleUserFromDB(id, req.body);
        if (result !== null) {
            return res.status(200).json({
                success: true,
                message: 'Order updated successfully',
                data: result,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getAllOrdersOfSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const id = parseInt(userId);
    try {
        const result = yield user_service_1.UserServices.getAllOrdersOfSingleUserFromDB(id);
        if (result !== null) {
            return res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                data: result,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req.params;
    const id = parseInt(userId);
    try {
        const result = yield user_service_1.UserServices.getTotalPriceFromDB(id);
        if (result !== null) {
            let totalPrice = 0;
            const totalArray = (_a = result[0].orders) === null || _a === void 0 ? void 0 : _a.map((e) => (e === null || e === void 0 ? void 0 : e.price) * (e === null || e === void 0 ? void 0 : e.quantity));
            totalArray.forEach((e) => (totalPrice += e));
            return res.status(200).json({
                success: true,
                message: 'Total price calculated successfully!',
                data: { totalPrice },
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.Usercontrollers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingelUser,
    updateAnOrder,
    getAllOrdersOfSingleUser,
    getTotalPrice,
};
