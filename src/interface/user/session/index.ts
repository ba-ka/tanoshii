import { Schema } from 'mongoose';
import QueryHelper from './queryHelper';

interface UserSession {
    user: Schema.Types.ObjectId;
    key: string;
    ip: string;
    detail: string;
    expired_at: number;
    created_at: number;
    updated_at: number;
}

export { UserSession, QueryHelper }