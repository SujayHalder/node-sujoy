import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';


const userController = express();

// list of all users -remove  this section after testing
userController.get('/userslist', async(req, res) => {
  const userModel= mongoose.model('User');
  const dbUsers= await userModel.find();
  res.json(dbUsers);
});

userController.get('/users', async(req, res) => {
  const userModel= mongoose.model('User');
  let decoded;
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization.split(',')[1]
    try {
      decoded = jwt.verify(authorization, config.jwtSecret);
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    // Fetch the user by id
    const user = JSON.parse(JSON.stringify(decoded));
    const userId= user.userId;

    const dbUsers = await userModel.find({ _id: { $ne: userId } });
    res.send({ userList: dbUsers, msg: 'success', token: authorization });
  }
  else {
    res.send({ userList:[{}], msg: 'Required mandatory field', token: '' });
  }
});
// --------------
// return a specific user
userController.get('/useredit', async (req, res) => {
  const userModel= mongoose.model('User');
  let  decoded;
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization.split(',')[1]
    try {
        decoded = jwt.verify(authorization, config.jwtSecret);
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    // Fetch the user by id
    const user=JSON.parse(JSON.stringify(decoded)) ;
    const dbUsers= await userModel.find({_id:user.userId});
    res.send(dbUsers);
}
});

userController.post('/users', async (req, res) => {
  const userModel= mongoose.model('User');
  const user = req.body;
  if(user.firstname !==undefined && user.firstname!==null  && user.password!==undefined && user.password!==null)
 {
  user.password=md5(user.password);
  await userModel.create(req.body);
  res.json({userId:0,msg:'Success'});
 }
 else{
  res.json({userId:0,msg:'Required mandatory filed'});
 }
});

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


const storage = multer.diskStorage({
  destination: './uploads/',
   filename(req, file, cb) {
     cb(null, uuidv4() + path.extname(file.originalname));
    }
  });

 const upload = multer({
   storage,
   limits: { fileSize: 1000000 },
 }).single('file');

userController.post('/users/image-upload', async (req, res) => {
  upload(req, res, async () => {
    console.log(req.file);
    console.log('File uploaded....');
    const resizedFile = sharp(path.join('./uploads/', req.file.filename));
    const imageName = uuidv4() + '.jpg';
    console.log(imageName);
    await resizedFile.resize(200).toFile(path.join('./uploads/', imageName));
    fs.unlinkSync(path.join('./uploads/', req.file.filename));
    let decoded;
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(',')[1]

      try {
        decoded = jwt.verify(authorization, config.jwtSecret);
} catch (e) {
return res.status(401).send('unauthorized');
      }

      // Fetch the user by id
     const user = JSON.parse(JSON.stringify(decoded));
      const userModel = mongoose.model('User');
      await userModel.updateOne({ _id: user.userId }, { profilePic: './uploads/'+imageName });
     res.json({ userId: user.userId, msg: 'Success', token: '' });
    }
    // res.send('Done');

  })

  // return res.status(200).send(req.file)

});
export default userController;