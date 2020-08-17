"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteModel = new mongoose_1.default.Schema({
    title: mongoose_1.default.Schema.Types.String,
    body: mongoose_1.default.Schema.Types.String,
    image: mongoose_1.default.Schema.Types.String,
    noteColor: mongoose_1.default.Schema.Types.String,
    creator: mongoose_1.default.Schema.Types.String
});
exports.default = mongoose_1.default.model('Note', noteModel);
//# sourceMappingURL=note-model.js.map