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
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const md5_1 = __importDefault(require("md5"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const userController = express_1.default();
// list of all users -remove  this section after testing
userController.get('/userslist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userModel = mongoose_1.default.model('User');
    const dbUsers = yield userModel.find();
    res.json(dbUsers);
}));
userController.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userModel = mongoose_1.default.model('User');
    let decoded;
    if (req.headers && req.headers.authorization) {
        const authorization = req.headers.authorization.split(',')[1];
        try {
            decoded = jwt.verify(authorization, config_1.default.jwtSecret);
        }
        catch (e) {
            return res.status(401).send('unauthorized');
        }
        // Fetch the user by id
        const user = JSON.parse(JSON.stringify(decoded));
        const userId = user.userId;
        const dbUsers = yield userModel.find({ _id: { $ne: userId } });
        res.send({ userList: dbUsers, msg: 'success', token: authorization });
    }
    else {
        res.send({ userList: [{}], msg: 'Required mandatory field', token: '' });
    }
}));
// --------------
// return a specific user
userController.get('/useredit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userModel = mongoose_1.default.model('User');
    let decoded;
    if (req.headers && req.headers.authorization) {
        const authorization = req.headers.authorization.split(',')[1];
        try {
            decoded = jwt.verify(authorization, config_1.default.jwtSecret);
        }
        catch (e) {
            return res.status(401).send('unauthorized');
        }
        // Fetch the user by id
        const user = JSON.parse(JSON.stringify(decoded));
        const dbUsers = yield userModel.find({ _id: user.userId });
        res.send(dbUsers);
    }
}));
userController.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userModel = mongoose_1.default.model('User');
    const user = req.body;
    if (user.firstname !== undefined && user.firstname !== null && user.password !== undefined && user.password !== null) {
        user.password = md5_1.default(user.password);
        yield userModel.create(req.body);
        res.json({ userId: 0, msg: 'Success' });
    }
    else {
        res.json({ userId: 0, msg: 'Required mandatory filed' });
    }
}));
// userController.put('/users/:id', async (req, res) => {
//   const user = req.body;
//   const userModel= mongoose.model('User');
//   await userModel.updateOne({_id:req.params.id},user);
//   res.json({status: true});
// });
// userController.delete('/users/:id', async (req, res) => {
//   const userModel= mongoose.model('User');
//   await userModel.remove({_id:req.params.id});
//   res.json({status: true});
// });
// userController.patch('/users/:id', (req, res) => {
//   const user = req.body;
//   const id = parseInt(req.params.id, 10);
//   if (user.name) {
//     users[id - 1].name = user.name;
//   }
//   if (user.age) {
//     users[id - 1].age = user.age;
//   }
//   res.json({status: true});
// });
// const storage = multer.diskStorage({
//// destination: (req, file, cb) => {
//  if (file.mimetype === 'image/png') {
//    cb(null, './uploads');
//  } else {
//    cb(Error('File type not allowed'), '');
//   }
// },
// filename: (req, file, cb) => {
//   const fileName = file.originalname;
//   const fileParts = fileName.split(/\./g);
//   const ext = fileParts[fileParts.length - 1];
//   cb(null, uuidv4() + '.' + ext);
// }
// })
const storage = multer_1.default.diskStorage({
    destination: './uploads/',
    filename(req, file, cb) {
        cb(null, uuid_1.v4() + path_1.default.extname(file.originalname));
    }
});
const upload = multer_1.default({
    storage,
    limits: { fileSize: 1000000 },
}).single('file');
userController.post('/users/image-upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.file);
        console.log('File uploaded....');
        const resizedFile = sharp_1.default(path_1.default.join('./uploads/', req.file.filename));
        const imageName = uuid_1.v4() + '.jpg';
        console.log(imageName);
        yield resizedFile.resize(200).toFile(path_1.default.join('./uploads/', imageName));
        fs_1.default.unlinkSync(path_1.default.join('./uploads/', req.file.filename));
        let decoded;
        if (req.headers && req.headers.authorization) {
            const authorization = req.headers.authorization.split(',')[1];
            try {
                decoded = jwt.verify(authorization, config_1.default.jwtSecret);
            }
            catch (e) {
                return res.status(401).send('unauthorized');
            }
            // Fetch the user by id
            const user = JSON.parse(JSON.stringify(decoded));
            const userModel = mongoose_1.default.model('User');
            yield userModel.updateOne({ _id: user.userId }, { profilePic: './uploads/' + imageName });
            res.json({ userId: user.userId, msg: 'Success', token: '' });
        }
        // res.send('Done');
    }));
    // return res.status(200).send(req.file)
}));
exports.default = userController;
//# sourceMappingURL=user-controller.js.map