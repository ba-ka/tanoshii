import { Document, Query } from 'mongoose';
import { KanbanBoard } from '.';

export default interface QueryHelper {
    byName(title: string): Query<any, Document<KanbanBoard>> & QueryHelper;
};