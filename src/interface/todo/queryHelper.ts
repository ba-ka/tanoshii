import { Document, Query } from 'mongoose';
import { Todo } from '../todo';

export interface TodoQueryHelper {
    byName(title: string): Query<any, Document<Todo>> & TodoQueryHelper;
};