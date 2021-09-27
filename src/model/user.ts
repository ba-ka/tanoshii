import { Model, Schema, model } from 'mongoose';
import { User, QueryHelper } from '../interface/user';
import bcrypt from 'bcrypt';

const schema = new Schema<User, Model<User>, User>({
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
});

schema.pre("save", function (next) {
    const data = this
    if (data.isModified("password") || data.isNew) {
        bcrypt.genSalt(10, function (error, password_salt) {
            if (error) {
                return next(error);
            } else {
                bcrypt.hash(data.password, password_salt, function (error, password_hash) {
                    if (error) { return next(error) }
                    data.password = password_hash;
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

export const UserModel = model<User, Model<User, QueryHelper>>('user', schema, 'user');