import QueryHelper from './queryHelper';

interface KanbanBoard {
    title: string;
    description: string;
    task: string[];
    created_at: number;
    updated_at: number;
}

export { KanbanBoard, QueryHelper }