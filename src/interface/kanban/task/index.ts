import QueryHelper from './queryHelper';
import { Schema } from 'mongoose';

interface KanbanTask {
    title: string;
    description: string;
    board: Schema.Types.ObjectId;
    author: Schema.Types.ObjectId;
    created_at: number;
    updated_at: number;
}

export { KanbanTask, QueryHelper }