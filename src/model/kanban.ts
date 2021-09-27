import { Model, Schema, model } from 'mongoose';
import { Kanban, QueryHelper } from '../interface/kanban';

const schema = new Schema<Kanban, Model<Kanban>, Kanban>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
});

export const KanbanModel = model<Kanban, Model<Kanban, QueryHelper>>('kanban', schema, 'kanban');