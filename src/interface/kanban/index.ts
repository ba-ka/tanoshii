import QueryHelper from './queryHelper';
import { KanbanBoard, QueryHelper as KanbanBoardQueryHelper } from './board';
import { KanbanTask, QueryHelper as KanbanTaskQueryHelper } from './task';
import { Schema } from 'mongoose';

interface Kanban {
    title: string;
    description: string;
    board: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId;
    created_at: number;
    updated_at: number;
}

export { Kanban, QueryHelper, KanbanBoard, KanbanBoardQueryHelper, KanbanTask, KanbanTaskQueryHelper }