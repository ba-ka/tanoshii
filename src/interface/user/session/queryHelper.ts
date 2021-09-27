import { Document, Query } from 'mongoose';
import { UserSession } from '.';

export default interface QueryHelper {
    byName(key: string): Query<any, Document<UserSession>> & QueryHelper;
};