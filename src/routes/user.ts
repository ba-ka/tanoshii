import express, { Request, Response } from 'express';
import { KanbanBoardModel, KanbanModel, KanbanTaskModel } from '../model/kanban';
import { UserModel, UserSessionModel } from '../model/user';
import { getDate } from '../lib/date';
import multer from 'multer';
import { Schema } from 'mongoose';
const upload = multer({ dest: 'upload/' });
const router = express.Router();

router.get('/api/user', async (req: Request, res: Response) => {
	const todo = await UserModel.find({});
	return res.status(200).send(todo);
});

router.get('/api/user/:userId/kanban', async (req: Request, res: Response) => {
	const userId: Schema.Types.ObjectId = new Schema.Types.ObjectId(req.params.userId);
	const todo = await KanbanModel.findOne({ author_id: userId });
	return res.status(200).send(todo);
});

export { router as userRouter }