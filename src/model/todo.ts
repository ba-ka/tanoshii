import { Model, Schema, model } from 'mongoose';
import { Todo } from '../interface/todo';
import { TodoQueryHelper } from '../interface/todo/queryHelper';

const schema = new Schema<Todo, Model<Todo>, Todo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
});

export const TodoModel = model<Todo, Model<Todo, TodoQueryHelper>>('list', schema)