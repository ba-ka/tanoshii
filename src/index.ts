import express from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import { kanbanRouter } from './routes/kanban';
import { authRouter } from './routes/auth';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routes/user';

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json()); 
app.use(urlencoded({ extended: true })); 
app.use(kanbanRouter);
app.use(authRouter);
app.use(userRouter);

let resultMongoDB = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// check using mongodb local or not
if (!DB_USER && !DB_PASS) {
  resultMongoDB = `mongodb://${DB_HOST}/${DB_NAME}`
}

mongoose.connect(resultMongoDB, () => {
  console.log('connected to db');
});

app.listen(port, () => {
  console.log(`tanoshii url http://localhost:${port}`)
});