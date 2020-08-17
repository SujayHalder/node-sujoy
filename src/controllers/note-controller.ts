import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import userModel, { TokenInterface } from '../models/user-model';
import { isNullOrUndefined } from 'util';

const noteController = express();

// list of all notes
noteController.get('/noteslist', async(req, res) => {
  const noteModel= mongoose.model('Note');
  const dbNotes= await noteModel.find();
  res.json(dbNotes);
});

// return list of notes for an user to edit
noteController.get('/notes/:id', async (req, res) => {
   const noteModel= mongoose.model('Note');
   const dbNotes= await noteModel.find({_id : req.params.id});
   res.json(dbNotes);
});

// return list of notes for an user
noteController.get('/notelist/:id', async (req, res) => {
  const noteModel= mongoose.model('Note');
  const dbNotes= await noteModel.find({creator : req.params.id});
  res.json(dbNotes);
});

// return list of all notes with user information.
noteController.get('/notes', async(req, res:Response) => {
  const noteModel= mongoose.model('Note');
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
    const dbNotes= await noteModel.find({creator:user.userId});
    res.send(dbNotes);
}
});


noteController.get('/allnotes', async(req, res) => {
  const noteModel= mongoose.model('Note');
  const dbNotes = await noteModel.find();// populate('userLists')
  const resultList=[]
  for (const row of dbNotes) {
    const dbusers = await userModel.find({ _id: (JSON.parse(JSON.stringify(row)).creator) })
    if (dbusers.length>0)
    {

    for (const rows of dbusers) {
      if (JSON.parse(JSON.stringify(rows)).firstname.length>0)
      {
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
});

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


noteController.post('/notes', async (req, res) => {
  let  decoded;
    upload(req, res, async () =>
    {
      console.log('File uploaded....');
      const resizedFile = sharp(path.join('./uploads/', req.file.filename));
      const imageName = uuidv4() + '.jpg';
      await resizedFile.resize(200).toFile(path.join('./uploads/', imageName));
      fs.unlinkSync(path.join('./uploads/', req.file.filename));

      if (req.headers && req.headers.authorization) {
       const authorization = req.headers.authorization.split(',')[1]

       try {
          decoded = jwt.verify(authorization, config.jwtSecret);
        } catch (e) {
          return res.status(401).send('unauthorized');
        }
        // Fetch the user by id
         const user = JSON.parse(JSON.stringify(decoded));
        const noteModel = mongoose.model('Note');
        await noteModel.create({ title: req.body.title, body: req.body.body, image: './uploads/' + imageName, noteColor: req.body.noteColor, creator: user.userId });
        res.json({ userId: user.userId, msg: 'Success', token: authorization });
       }
    })
});



  noteController.put('/notes/:id', async (req, res) => {
    let decoded;
    const note = req.body;
    upload(req, res, async () => {
      console.log('File uploaded....');
      // const imageName='' ;
      const resizedFile = sharp(path.join('./uploads/', req.file.filename));
      const imageName = uuidv4() + '.jpg';
      await resizedFile.resize(200).toFile(path.join('./uploads/', imageName));
      fs.unlinkSync(path.join('./uploads/', req.file.filename));

      if (req.headers && req.headers.authorization) {
        const authorization = req.headers.authorization.split(',')[1]

        try {
          decoded = jwt.verify(authorization, config.jwtSecret);
        } catch (e) {
          return res.status(401).send('unauthorized');
        }

        // Fetch the user by id
        const user = JSON.parse(JSON.stringify(decoded));
       // console.log('Title-'+req.body.title+' Body-'+req.body.body+' Color-'+req.body.noteColor+' UID-'+user.userId+' NID-'+req.params.id+' Image-'+imageName);
        const noteModel = mongoose.model('Note');
        await noteModel.updateOne({ _id: req.params.id }, { title: req.body.title, body: req.body.body, image: './uploads/' + imageName, noteColor: req.body.noteColor, creator: user.userId });
        res.json({ userId: user.userId, msg: 'Success', token: authorization });
      }
     })
  });

noteController.delete('/notes/:id', async (req, res) => {
  const noteModel= mongoose.model('Note');
  await noteModel.deleteOne({_id:req.params.id});
  res.json({status: true});
});

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

export default noteController;