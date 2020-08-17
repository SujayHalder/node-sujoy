"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const login_controller_1 = __importDefault(require("./controllers/login-controller"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
const note_controller_1 = __importDefault(require("./controllers/note-controller"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const port = 10060;
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/files', express_1.default.static('./uploads'));
app.use('/', express_1.default.static('./frontend'));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(port, () => {
    console.log(`Server created on port: ${port}`);
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use(login_controller_1.default);
app.use(user_controller_1.default);
app.use(note_controller_1.default);
app.use(cors_1.default());
app.use('*', express_1.default.static('./frontend'));
// mongoose.connect('mongodb://localhost:27017/nodeassignmenttask',{useNewUrlParser:true, useUnifiedTopology: true},(error)=>{
mongoose_1.default.connect('mongodb://admin:UKeDe1y45vDN9M05@15.207.8.251:27017/node_task_sujay?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Connected to MongoDB');
        console.log('express path', __dirname);
        require('./models/user-model.js');
        require('./models/note-model.js');
    }
});
//# sourceMappingURL=app.js.map