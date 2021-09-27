import express, { Request, Response } from 'express';
import { KanbanModel } from '../model/kanban';
import { getDate } from '../lib/date';
import multer from 'multer';
const upload = multer({ dest: 'upload/' });
const router = express.Router();

router.post('/api/kanban/upload', upload.single('image'), async (req: Request, res: Response) => {
  console.log(req.file);
  return res.status(200).send('ok');
});

router.get('/api/kanban', async (req: Request, res: Response) => {
  const todo = await KanbanModel.find();
  return res.status(200).send(todo);
});

router.post('/api/kanban', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const dateNow = getDate();

  await KanbanModel.create({
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

router.put('/api/kanban', async (req: Request, res: Response) => {
  const { id, title, description } = req.body;
  const dateNow = getDate();

  await KanbanModel.updateOne({
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

router.delete('/api/kanban', async (req: Request, res: Response) => {
  const { id } = req.body;

  await KanbanModel.deleteOne({
    _id: id 
  }).then((result) => {
    console.log("document delete");
  }).catch((error) => {
    console.log(error.Message);
  });
  return res.status(200).send('ok');
});

export { router as kanbanRouter }