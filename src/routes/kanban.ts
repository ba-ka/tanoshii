import express, { Request, Response } from 'express';
import { KanbanBoardModel, KanbanModel, KanbanTaskModel } from '../model/kanban';
import { UserModel, UserSessionModel } from '../model/user';
import { Types } from 'mongoose';
import { getDate } from '../lib/date';
import multer from 'multer';
const upload = multer({ dest: 'upload/' });
const router = express.Router();

// list user kanban
router.get('/api/kanban', async (req: Request, res: Response) => {
	const auth: string = req.query.auth as string;
	const dateNow = getDate();
	const responseStatus: ResponseStatus = {
        'status': 400,
        'error': {
            'message': 'something wrong'
        }
    }
	const responseResult: any = {}

	if (auth) {
		const userSession = await UserSessionModel.findOne({ key: auth, expired_at: { $gte: dateNow } });
		if (userSession) {
			const getKanban: any = await KanbanModel.find({ author: userSession.user });
			if (getKanban) {
				const kanbanList: any = []
				
				for (let i = 0; i < getKanban.length; i++) {
					const reData: any = {
						id: getKanban[i]._id,
						title: getKanban[i].title,
						description: getKanban[i].description
					}
					
					kanbanList.push(reData)
				}
				
				responseStatus.status = 200;
				responseResult.row = kanbanList;
			} else {
				responseStatus.status = 400;
				responseStatus.error.message = 'kanban not found';
			}
		} else {
			responseStatus.status = 401;
			responseStatus.error.message = 'auth not valid or expired';
		}
	} else {
		responseStatus.status = 400;
		responseStatus.error.message = 'auth is required, please try again';
	}

	if (responseStatus.status != 200) {
		responseResult.error = responseStatus.error;
	}

	return res.status(responseStatus.status).send(responseResult);
});

// get deep data 1 kanban
router.get('/api/kanban/:kanbanId', async (req: Request, res: Response) => {
	const auth: string = req.query.auth as string;
	const kanbanId = req.params.kanbanId;
	const dateNow = getDate();
	const responseStatus: ResponseStatus = {
        'status': 400,
        'error': {
            'message': 'something wrong'
        }
    }
	const responseResult: any = {}

	if (auth) {
		const userSession = await UserSessionModel.findOne({ key: auth, expired_at: { $gte: dateNow } });
		if (userSession) {
			const getKanban: any = await KanbanModel.findOne({ _id: kanbanId, author: userSession.user }).populate({
				path: 'board',
				populate: {
					path: 'task'
				}
			});
			if (getKanban) {
				const boardList: any = []
				
				for (let i = 0; i < getKanban.board.length; i++) {
					const taskList: any = []
					for (let i2 = 0; i2 < getKanban.board[i].task.length; i2++) {
						const reDataTask: any = {
							id: getKanban.board[i].task[i2]._id,
							content: getKanban.board[i].task[i2].content,
						}
						taskList.push(reDataTask)
					}

					const reData: any = {
						id: getKanban.board[i]._id,
						title: getKanban.board[i].title,
						task: taskList
					}
					boardList.push(reData)
				}
				
				responseStatus.status = 200;
				responseResult.kanban_id = getKanban._id;
				responseResult.title = getKanban.title;
				responseResult.description = getKanban.description;
				responseResult.board = boardList;
			} else {
				responseStatus.status = 400;
				responseStatus.error.message = 'kanban not found';
			}
		} else {
			responseStatus.status = 401;
			responseStatus.error.message = 'auth not valid or expired';
		}
	} else {
		responseStatus.status = 400;
		responseStatus.error.message = 'auth is required, please try again';
	}

	if (responseStatus.status != 200) {
		responseResult.error = responseStatus.error;
	}

	return res.status(responseStatus.status).send(responseResult);
});

// create kanban
router.post('/api/kanban', async (req: Request, res: Response) => {
	const { title, description, auth } = req.body;
	const dateNow = getDate();
	const responseStatus: ResponseStatus = {
        'status': 400,
        'error': {
            'message': 'something wrong'
        }
    }
	const responseResult: any = {}

	if (title && description && auth) {
		const userSession = await UserSessionModel.findOne({ key: auth, expired_at: { $gte: dateNow } });
		if (userSession) {
			const createKanban = await KanbanModel.create({
				title: title,
				description: description,
				author: userSession.user,
				board: [],
				updated_at: dateNow,
				created_at: dateNow
			});
			
			if (createKanban) {
				responseStatus.status = 200;
				responseResult.kanban_id = createKanban._id;
				responseResult.title = createKanban.title;
				responseResult.description = createKanban.description;
			}
		} else {
			responseStatus.status = 401;
            responseStatus.error.message = 'auth not valid or expired';
		}
	} else {
		responseStatus.status = 400;
        responseStatus.error.message = 'title, description, auth is required, please try again';
	}
	
	if (responseStatus.status != 200) {
        responseResult.error = responseStatus.error;
    }

    return res.status(responseStatus.status).send(responseResult);
});

// create kanban board
router.post('/api/kanban/:kanbanId', async (req: Request, res: Response) => {
	const { title, auth } = req.body;
	const description = "none";
	const kanbanId = req.params.kanbanId;
	const dateNow = getDate();
	const responseStatus: ResponseStatus = {
        'status': 400,
        'error': {
            'message': 'something wrong'
        }
    }
	const responseResult: any = {}

	if (title && description && auth) {
		const userSession = await UserSessionModel.findOne({ key: auth, expired_at: { $gte: dateNow } });
		if (userSession) {
			const getKanban = await KanbanModel.findOne({ _id: kanbanId, author: userSession.user });
			if (getKanban) {
				const createBoard = await KanbanBoardModel.create({
					kanban: getKanban._id,
					title: title,
					description: description,
					author: userSession.user,
					task: [],
					updated_at: dateNow,
					created_at: dateNow
				});
				
				const updateKanban = await KanbanModel.updateOne({ _id: getKanban._id }, {
					$push: { board: createBoard._id },
					updated_at: dateNow
				});

				if (updateKanban.matchedCount > 0) {
					responseStatus.status = 200;
					responseResult.kanban_id = getKanban._id;
					responseResult.board_id = createBoard._id
					responseResult.title = createBoard.title;
					responseResult.description = createBoard.description;
				}

			} else {
				responseStatus.status = 400;
				responseStatus.error.message = 'kanban not found';
			}
		} else {
			responseStatus.status = 401;
			responseStatus.error.message = 'auth not valid or expired';
		}
	} else {
		responseStatus.status = 400;
        responseStatus.error.message = 'title, description, auth is required, please try again';
	}
	
	if (responseStatus.status != 200) {
        responseResult.error = responseStatus.error;
    }

    return res.status(responseStatus.status).send(responseResult);
});

// create kanban task
router.post('/api/kanban/:kanbanId/:boardId', async (req: Request, res: Response) => {
	const { content, auth } = req.body;
	const kanbanId = req.params.kanbanId;
	const boardId = req.params.boardId;
	const dateNow = getDate();
	const responseStatus: ResponseStatus = {
        'status': 400,
        'error': {
            'message': 'something wrong'
        }
    }
	const responseResult: any = {}

	if (content && auth) {
		if (Types.ObjectId.isValid(kanbanId) && Types.ObjectId.isValid(boardId)) {
			const userSession = await UserSessionModel.findOne({ key: auth, expired_at: { $gte: dateNow } });
			if (userSession) {
				const getKanban = await KanbanModel.findOne({ _id: kanbanId, author: userSession.user });
				if (getKanban) {
					const getBoard = await KanbanBoardModel.findOne({ _id: boardId, kanban: getKanban._id, author: userSession.user });
					if (getBoard) {
						const createTask = await KanbanTaskModel.create({
							board: getBoard._id,
							content: content,
							author: userSession.user,
							updated_at: dateNow,
							created_at: dateNow
						})

						const updateBoard = await KanbanBoardModel.updateOne({ _id: getBoard._id, kanban: getKanban._id }, {
							$push: { task: createTask._id },
							updated_at: dateNow
						});
		
						if (updateBoard.matchedCount > 0) {
							responseStatus.status = 200;
							responseResult.kanban_id = getKanban._id;
							responseResult.board_id = getBoard._id;
							responseResult.task_id = createTask._id;
							responseResult.content = createTask.content;
						}
					}

				} else {
					responseStatus.status = 400;
					responseStatus.error.message = 'kanban not found';
				}
			} else {
				responseStatus.status = 401;
				responseStatus.error.message = 'auth not valid or expired';
			}
		} else {
			responseStatus.status = 401;
			responseStatus.error.message = 'id not valid';
		}
	} else {
		responseStatus.status = 400;
        responseStatus.error.message = 'content, auth is required, please try again';
	}
	
	if (responseStatus.status != 200) {
        responseResult.error = responseStatus.error;
    }

    return res.status(responseStatus.status).send(responseResult);
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