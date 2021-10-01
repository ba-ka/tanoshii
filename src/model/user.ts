import { Model, Schema, model } from 'mongoose';
import { User, QueryHelper, UserSession, UserSessionQueryHelper } from '../interface/user';
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
});

const schemaUserSession = new Schema<UserSession, Model<UserSession>, UserSession>({
    user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    key: { type: String, required: true },
    ip: { type: String, required: true },
    detail: { type: String, required: true },
    expired_at: { type: Number, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
});

export const UserModel = model<User, Model<User, QueryHelper>>('user', schema, 'user');

export const UserSessionModel = model<UserSession, Model<UserSession, UserSessionQueryHelper>>('user_session', schemaUserSession, 'user_session');