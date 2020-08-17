"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const md5_1 = __importDefault(require("md5"));
const config_1 = __importDefault(require("../config/config"));
const jwt = __importStar(require("jsonwebtoken"));
const loginController = express_1.default();
loginController.post('/loginController/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const userModel = mongoose_1.default.model('User');
    if (reqBody.email !== undefined && reqBody.email != null && reqBody.password !== undefined && reqBody.password !== null) {
        userModel.find({ email: reqBody.email, password: md5_1.default(reqBody.password) }, (err, results) => {
            if (err) {
                res.send({ userId: 0, msg: 'Required mandatory field', token: '' });
            }
            else {
                if (results.length > 0) {
                    const token = jwt.sign({ userId: results[0]._id }, config_1.default.jwtSecret, { expiresIn: '10h' });
                    res.send({ userId: results[0]._id, msg: 'success', token });
                }
                else {
                    res.send({ userId: '0', msg: 'fail', token: '' });
                }
            }
        });
    }
    else {
        res.send({ userId: 0, msg: 'Required mandatory field', token: '' });
    }
}));
exports.default = loginController;
//# sourceMappingURL=login-controller.js.map