import QueryHelper from './queryHelper';

interface Kanban {
    title: string;
    description: string;
    created_at: number;
    updated_at: number;
}

export { Kanban, QueryHelper }