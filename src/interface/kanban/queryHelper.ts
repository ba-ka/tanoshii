import { Document, Query } from 'mongoose';
import { Kanban } from '.';

export default interface QueryHelper {
    byName(title: string): Query<any, Document<Kanban>> & QueryHelper;
};