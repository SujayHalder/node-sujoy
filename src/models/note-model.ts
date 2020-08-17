import mongoose, { model } from 'mongoose';

const noteModel= new mongoose.Schema({
    title: mongoose.Schema.Types.String,
    body: mongoose.Schema.Types.String,
    image : mongoose.Schema.Types.String,
    noteColor : mongoose.Schema.Types.String,
    creator : mongoose.Schema.Types.String
});

export default mongoose.model('Note',noteModel);
