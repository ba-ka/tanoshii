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
    const responseStatus: ResponseStatus = {
        'status': 400,
        'error': {
            'code': 1,
            'message': 'something wrong'
        }
    }
    const responseResult: any = {}

    if (username && password) {
        const getUser = await UserModel.findOne({ username: username });
        if (getUser) {
            const password_data = getUser['password'];
            const isPasswordRight = await bcrypt.compare(password, password_data);
            if (isPasswordRight) {
                responseStatus.status = 200;
                responseResult.username = getUser.username;
                responseResult.avatar = getUser.avatar;
            } else {
                responseStatus.status = 401;
                responseStatus.error.code = 3;
                responseStatus.error.message = 'invalid username or password, please try again';
            }
        } else {
            responseStatus.status = 401;
            responseStatus.error.code = 3;
            responseStatus.error.message = 'invalid username or password, please try again';
        }
    } else {
        responseStatus.status = 400;
        responseStatus.error.code = 2;
        responseStatus.error.message = 'username and password is required, please try again';
    }

    if (responseStatus.status != 200) {
        responseResult.error = responseStatus.error;
    }

    return res.status(responseStatus.status).send(responseResult);
});

export { router as authRouter }