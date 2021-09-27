import express, { Request, Response } from 'express';
import { TodoModel } from '../model/todo';
import { getDate } from '../lib/date';
import multer from 'multer';
const upload = multer({ dest: 'upload/' });
const router = express.Router();

router.post('/api/todo/upload', upload.single('image'), async (req: Request, res: Response) => {
  console.log(req.file);
  return res.status(200).send('ok');
});

router.get('/api/todo', async (req: Request, res: Response) => {
  const todo = await TodoModel.find();
  return res.status(200).send(todo);
});

router.post('/api/todo', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const dateNow = getDate();

  await TodoModel.create({
    title: title,
    description: description,
    updated_at: dateNow,
    created_at: dateNow
  }).then((result) => {
    console.log("document inserted");
  }).catch((error) => {
    console.log(error.Message);
  });
  return res.status(200).send('ok');
});

router.put('/api/todo', async (req: Request, res: Response) => {
  const { id, title, description } = req.body;
  const dateNow = getDate();

  await TodoModel.updateOne({
    _id: id 
    },
    {
    title: title,
    description: description,
    updated_at: dateNow
  }).then((result) => {
    console.log("document update");
  }).catch((error) => {
    console.log(error.Message);
  });
  return res.status(200).send('ok');
});

router.delete('/api/todo', async (req: Request, res: Response) => {
  const { id } = req.body;

  await TodoModel.deleteOne({
    _id: id 
  }).then((result) => {
    console.log("document delete");
  }).catch((error) => {
    console.log(error.Message);
  });
  return res.status(200).send('ok');
});

export { router as todoRouter }