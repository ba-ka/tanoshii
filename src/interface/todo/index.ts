import QueryHelper from './queryHelper';

interface Todo {
    title: string;
    description: string;
    created_at: number;
    updated_at: number;
}

export { Todo, QueryHelper }