import QueryHelper from './queryHelper';
import { Schema } from 'mongoose';

interface KanbanBoard {
    title: string;
    description: string;
    kanban: Schema.Types.ObjectId;
    task: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId;
    created_at: number;
    updated_at: number;
}

export { KanbanBoard, QueryHelper }