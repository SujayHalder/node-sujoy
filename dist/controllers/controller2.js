"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller2 = express_1.default();
controller2.get('/controller2/first', (req, res) => {
    res.send('Response from first route in controller 2');
});
controller2.get('/controller2/second', (req, res) => {
    res.send('Response from 2nd route in controller 2');
});
exports.default = controller2;
//# sourceMappingURL=controller2.js.map