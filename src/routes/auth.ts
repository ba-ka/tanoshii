import express, { Request, Response } from 'express';
import { UserModel } from '../model/user';
import { getDate } from '../lib/date';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { Error } from 'mongoose';
const upload = multer({ dest: 'upload/' });
const router = express.Router();

router.post('/api/auth/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const dateNow = getDate();
    const getUser = await UserModel.findOne({ username: username });

    if (!getUser) {
        UserModel.create({
            username: username,
            password: password,
            avatar: 'none',
            updated_at: dateNow,
            created_at: dateNow
        }).then((result) => {
            console.log("document inserted");
        }).catch((error) => {
            console.log(error.Message);
        });
    }

    return res.status(200).send('ok');
});

router.post('/api/auth/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const dateNow = getDate();
    const getUser = await UserModel.findOne({ username: username });
    const resultSend = {
        'error': true
    }
    
    if (getUser) {
        const password_data = getUser['password'];
        const isPasswordRight = await bcrypt.compare(password, password_data);
        if (isPasswordRight) {
            resultSend['error'] = false;
        }
    }

    return res.status(200).send(resultSend);
});

export { router as authRouter }