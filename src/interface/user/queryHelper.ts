import { Document, Query } from 'mongoose';
import { User } from '../user';

export default interface QueryHelper {
    byName(username: string): Query<any, Document<User>> & QueryHelper;
};