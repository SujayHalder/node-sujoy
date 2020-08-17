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
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const user_model_1 = __importDefault(require("../models/user-model"));
const noteController = express_1.default();
// list of all notes
noteController.get('/noteslist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteModel = mongoose_1.default.model('Note');
    const dbNotes = yield noteModel.find();
    res.json(dbNotes);
}));
// return list of notes for an user to edit
noteController.get('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteModel = mongoose_1.default.model('Note');
    const dbNotes = yield noteModel.find({ _id: req.params.id });
    res.json(dbNotes);
}));
// return list of notes for an user
noteController.get('/notelist/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteModel = mongoose_1.default.model('Note');
    const dbNotes = yield noteModel.find({ creator: req.params.id });
    res.json(dbNotes);
}));
// return list of all notes with user information.
noteController.get('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteModel = mongoose_1.default.model('Note');
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
        const dbNotes = yield noteModel.find({ creator: user.userId });
        res.send(dbNotes);
    }
}));
noteController.get('/allnotes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteModel = mongoose_1.default.model('Note');
    const dbNotes = yield noteModel.find(); // populate('userLists')
    const resultList = [];
    for (const row of dbNotes) {
        const dbusers = yield user_model_1.default.find({ _id: (JSON.parse(JSON.stringify(row)).creator) });
        if (dbusers.length > 0) {
            for (const rows of dbusers) {
                if (JSON.parse(JSON.stringify(rows)).firstname.length > 0) {
                    resultList.push({
                        title: JSON.parse(JSON.stringify(row)).title,
                        body: JSON.parse(JSON.stringify(row)).body,
                        image: JSON.parse(JSON.stringify(row)).image,
                        noteColor: JSON.parse(JSON.stringify(row)).noteColor,
                        creator: JSON.parse(JSON.stringify(rows)).firstname
                    });
                }
            }
        }
    }
    res.json({ userId: 0, msg: 'Success', data: resultList });
}));
// noteController.post('/notes', async (req, res) => {
// const noteModel= mongoose.model('Note');
// let  decoded;
// if(!isNullOrUndefined(req.body.title) && req.body.title !=='' && !isNullOrUndefined(req.body.body) && req.body.body !=='')
// {
// if (req.headers && req.headers.authorization) {
// const authorization = req.headers.authorization.split(',')[1]
// try {
//     decoded = jwt.verify(authorization, config.jwtSecret);
// } catch (e) {
//     return res.status(401).send('unauthorized');
// }
// const user=JSON.parse(JSON.stringify(decoded));
// await noteModel.create({title:req.body.title, body:req.body.body, image:req.body.image, noteColor:req.body.noteColor,
//  creator:user.userId});
// res.json({userId:user.userId,msg:'Success',token:authorization});
// }
// }
// else{
// res.json({userId:0,msg:'Required mandatory filed'});
// }
// });
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
noteController.post('/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let decoded;
    upload(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('File uploaded....');
        const resizedFile = sharp_1.default(path_1.default.join('./uploads/', req.file.filename));
        const imageName = uuid_1.v4() + '.jpg';
        yield resizedFile.resize(200).toFile(path_1.default.join('./uploads/', imageName));
        fs_1.default.unlinkSync(path_1.default.join('./uploads/', req.file.filename));
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
            const noteModel = mongoose_1.default.model('Note');
            yield noteModel.create({ title: req.body.title, body: req.body.body, image: './uploads/' + imageName, noteColor: req.body.noteColor, creator: user.userId });
            res.json({ userId: user.userId, msg: 'Success', token: authorization });
        }
    }));
}));
noteController.put('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let decoded;
    const note = req.body;
    upload(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('File uploaded....');
        // const imageName='' ;
        const resizedFile = sharp_1.default(path_1.default.join('./uploads/', req.file.filename));
        const imageName = uuid_1.v4() + '.jpg';
        yield resizedFile.resize(200).toFile(path_1.default.join('./uploads/', imageName));
        fs_1.default.unlinkSync(path_1.default.join('./uploads/', req.file.filename));
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
            // console.log('Title-'+req.body.title+' Body-'+req.body.body+' Color-'+req.body.noteColor+' UID-'+user.userId+' NID-'+req.params.id+' Image-'+imageName);
            const noteModel = mongoose_1.default.model('Note');
            yield noteModel.updateOne({ _id: req.params.id }, { title: req.body.title, body: req.body.body, image: './uploads/' + imageName, noteColor: req.body.noteColor, creator: user.userId });
            res.json({ userId: user.userId, msg: 'Success', token: authorization });
        }
    }));
}));
noteController.delete('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteModel = mongoose_1.default.model('Note');
    yield noteModel.deleteOne({ _id: req.params.id });
    res.json({ status: true });
}));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.mimetype === 'image/png') {
//       cb(null, './uploads');
//     } else {
//       cb(Error('File type not allowed'), '');
//     }
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname;
//     const fileParts = fileName.split(/\./g);
//     const ext = fileParts[fileParts.length - 1];
//     cb(null, uuidv4() + '.' + ext);
//   }
// })
// const uploader = multer({storage});
// noteController.post('/notes/:id/image-upload', uploader.single('image'), async (req, res) => {
//   console.log(req.file);
//   console.log('File uploaded....');
//   const resizedFile = sharp(path.join(req.file.destination, req.file.filename));
//   const imageName= uuidv4() + '.jpg';
//   await resizedFile.resize(200).toFile(path.join(req.file.destination, imageName));
//   fs.unlinkSync(path.join(req.file.destination, req.file.filename));
//   const noteModel= mongoose.model('Note');
//   await noteModel.updateOne({_id:req.params.id}, {image: imageName});
//   res.send('Done');
// });
exports.default = noteController;
//# sourceMappingURL=note-controller.js.map