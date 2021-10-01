import QueryHelper from './queryHelper';

interface KanbanBoard {
    title: string;
    description: string;
    kanban_id: string;
    task: string[];
    author_id: string;
    created_at: number;
    updated_at: number;
}

export { KanbanBoard, QueryHelper }