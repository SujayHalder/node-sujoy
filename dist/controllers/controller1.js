"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller1 = express_1.default();
controller1.get('/controller1/first', (req, res) => {
    const list = [
        'One',
        'Two',
        'Three',
        'Four',
        'Five'
    ];
    res.render('index', {
        numbers: list,
        pageName: 'Numbers'
    });
});
controller1.get('/controller1/second', (req, res) => {
    res.render('sub-views/file');
});
controller1.post('/controller1/login', (req, res) => {
    const reqBody = req.body;
    const userName = 'user@mail.com';
    const password = 'password@123';
    if (userName === reqBody.email && password === reqBody.password) {
        res.send('Welcome');
    }
    else {
        res.send('Login Failed');
    }
});
exports.default = controller1;
//# sourceMappingURL=controller1.js.map