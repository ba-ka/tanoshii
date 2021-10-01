import QueryHelper from './queryHelper';
import { Schema } from 'mongoose';

interface KanbanBoard {
    title: string;
    description: string;
    kanban_id: Schema.Types.ObjectId;
    task: Schema.Types.ObjectId[];
    author_id: Schema.Types.ObjectId;
    created_at: number;
    updated_at: number;
}

export { KanbanBoard, QueryHelper }