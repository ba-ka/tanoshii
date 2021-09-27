import { Document, Query } from 'mongoose';
import { Todo } from '../todo';

export default interface QueryHelper {
    byName(title: string): Query<any, Document<Todo>> & QueryHelper;
};