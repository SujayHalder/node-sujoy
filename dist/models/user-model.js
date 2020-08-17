"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
    firstname: mongoose_1.default.Schema.Types.String,
    lastname: mongoose_1.default.Schema.Types.String,
    email: mongoose_1.default.Schema.Types.String,
    mobileNumber: mongoose_1.default.Schema.Types.String,
    password: mongoose_1.default.Schema.Types.String,
    profilePic: mongoose_1.default.Schema.Types.String
});
exports.default = mongoose_1.default.model('User', userModel);
//# sourceMappingURL=user-model.js.map