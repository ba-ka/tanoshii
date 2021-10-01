import QueryHelper from './queryHelper';
import { Schema } from 'mongoose';

interface KanbanTask {
    title: string;
    description: string;
    board_id: Schema.Types.ObjectId;
    author_id: Schema.Types.ObjectId;
    created_at: number;
    updated_at: number;
}

export { KanbanTask, QueryHelper }