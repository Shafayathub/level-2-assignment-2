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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    const result = yield user_model_1.UserModel.find(query, {
        _id: 0,
        password: 0,
        isDeleted: 0,
    });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield user_model_1.UserModel.isUserExists(userId)) === null) {
        return null;
    }
    const result = yield user_model_1.UserModel.findOne({ userId }, { _id: 0, password: 0, isDeleted: 0 });
    return result;
});
const updateSingleUserFromDB = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield user_model_1.UserModel.isUserExists(userId)) === null) {
        return null;
    }
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, { $set: Object.assign({}, user) }, { new: true });
    return result;
});
const deleteSingelUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield user_model_1.UserModel.isUserExists(userId)) === null) {
        return null;
    }
    const result = yield user_model_1.UserModel.updateOne({ userId }, { isDeleted: true });
    return result;
});
const updateOdersOfSingleUserFromDB = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield user_model_1.UserModel.isUserExists(userId)) === null) {
        return null;
    }
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, { $push: { orders: order } }, { new: true });
    return result;
});
const getAllOrdersOfSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield user_model_1.UserModel.isUserExists(userId)) === null) {
        return null;
    }
    const result = yield user_model_1.UserModel.findOne({ userId }, { orders: 1, _id: 0 });
    return result;
});
const getTotalPriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield user_model_1.UserModel.isUserExists(userId)) === null) {
        return null;
    }
    const result = yield user_model_1.UserModel.aggregate([
        { $match: { userId } },
        {
            $project: {
                _id: 0,
                orders: 1,
            },
        },
    ]);
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingelUserFromDB,
    updateOdersOfSingleUserFromDB,
    getAllOrdersOfSingleUserFromDB,
    getTotalPriceFromDB,
};
