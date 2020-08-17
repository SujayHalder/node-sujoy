import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import loginController from './controllers/login-controller';
import userController from './controllers/user-controller';
import noteController from './controllers/note-controller';
import mongoose from 'mongoose';
import cors from'cors';

const port = 10060;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/files',express.static('./uploads'));
app.use('/', express.static('./frontend'));


app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.listen(port, () => {
  console.log(`Server created on port: ${port}`);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use(loginController);
app.use(userController);
app.use(noteController);
app.use(cors());
app.use('*',express.static('./frontend'));

// mongoose.connect('mongodb://localhost:27017/nodeassignmenttask',{useNewUrlParser:true, useUnifiedTopology: true},(error)=>{
  mongoose.connect('mongodb://admin:UKeDe1y45vDN9M05@15.207.8.251:27017/node_task_sujay?authSource=admin',
  {useNewUrlParser:true, useUnifiedTopology: true},(error)=>{
  if(error){
    console.log(error);
  }
  else{
    console.log('Connected to MongoDB');
    console.log('express path', __dirname);
    require('./models/user-model.js');
    require('./models/note-model.js');
  }
});