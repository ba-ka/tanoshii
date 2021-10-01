import QueryHelper from './queryHelper';
import { KanbanBoard, QueryHelper as KanbanBoardQueryHelper } from './board';
import { KanbanTask, QueryHelper as KanbanTaskQueryHelper } from './task';

interface Kanban {
    title: string;
    description: string;
    board: string[];
    created_at: number;
    updated_at: number;
}

export { Kanban, QueryHelper, KanbanBoard, KanbanBoardQueryHelper, KanbanTask, KanbanTaskQueryHelper }