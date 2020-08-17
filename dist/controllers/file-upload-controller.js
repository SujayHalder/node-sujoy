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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileUploadController = express_1.default();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/png') {
            cb(null, './uploads');
        }
        else {
            cb(Error('File type not allowed'), '');
        }
    },
    // file.1.png -> [file - 0, 1 - 1, png - 2] -> 3 -> 3-1 = 2
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        const fileParts = fileName.split(/\./g);
        const ext = fileParts[fileParts.length - 1];
        cb(null, uuid_1.v4() + '.' + ext);
    }
});
const uploader = multer_1.default({ storage });
fileUploadController.post('/image-upload', uploader.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    console.log('File uploaded....');
    const resizedFile = sharp_1.default(path_1.default.join(req.file.destination, req.file.filename));
    yield resizedFile.resize(200).toFile(path_1.default.join(req.file.destination, uuid_1.v4() + '.jpg'));
    fs_1.default.unlinkSync(path_1.default.join(req.file.destination, req.file.filename));
    res.send('Done');
}));
exports.default = fileUploadController;
//# sourceMappingURL=file-upload-controller.js.map