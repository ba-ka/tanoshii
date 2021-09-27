import { Document, Query } from 'mongoose';
import { User } from '../user';

export interface UserQueryHelper {
    byName(username: string): Query<any, Document<User>> & UserQueryHelper;
};