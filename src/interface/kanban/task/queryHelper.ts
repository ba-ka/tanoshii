import { Document, Query } from 'mongoose';
import { KanbanTask } from '.';

export default interface QueryHelper {
    byName(title: string): Query<any, Document<KanbanTask>> & QueryHelper;
};