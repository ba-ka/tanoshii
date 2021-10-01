import QueryHelper from './queryHelper';

interface KanbanTask {
    title: string;
    description: string;
    board_id: string;
    created_at: number;
    updated_at: number;
}

export { KanbanTask, QueryHelper }