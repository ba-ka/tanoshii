import { Model, Schema, model } from 'mongoose';
import { User, QueryHelper } from '../interface/user';

const schema = new Schema<User, Model<User>, User>({
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    password: { type: String, required: true },
    password_salt: { type: String, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
});

export const UserModel = model<User, Model<User, QueryHelper>>('user', schema, 'user');