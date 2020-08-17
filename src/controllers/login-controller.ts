import express from 'express';
import mongoose from 'mongoose';
import md5 from 'md5';

import config from '../config/config';
import * as jwt from 'jsonwebtoken';

const loginController = express();

loginController.post('/loginController/login', async(req, res) => {
  const reqBody = req.body;
  const userModel= mongoose.model('User');

if(reqBody.email !==undefined && reqBody.email!=null  && reqBody.password!==undefined && reqBody.password!==null)
 {
  userModel.find({email : reqBody.email, password : md5(reqBody.password)}, (err, results)=>{

     if(err)
        {
           res.send({userId:0,msg:'Required mandatory field',token:''});
        }
     else
     {
       if (results.length>0)
       {
         const token = jwt.sign({ userId: results[0]._id }, config.jwtSecret, { expiresIn: '10h' });
         res.send({ userId: results[0]._id, msg: 'success', token});
       }
       else{
         res.send({ userId: '0', msg: 'fail', token:'' });
       }
     }
  });
 }
 else{
  res.send({userId:0,msg:'Required mandatory field',token:''});
 }
});

export default loginController;