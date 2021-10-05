import { Model, Schema, model } from 'mongoose';
import { Kanban, QueryHelper, KanbanBoard, KanbanBoardQueryHelper, KanbanTask, KanbanTaskQueryHelper } from '../interface/kanban';

const schema = new Schema<Kanban, Model<Kanban>, Kanban>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    board: { type: [Schema.Types.ObjectId], ref: 'kanban_board', required: false },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
});

const schemaBoard = new Schema<KanbanBoard, Model<KanbanBoard>, KanbanBoard>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    kanban: { type: Schema.Types.ObjectId, ref: 'kanban', required: true },
    task: { type: [Schema.Types.ObjectId], ref: 'kanban_task', required: false },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
});

const schemaTask = new Schema<KanbanTask, Model<KanbanTask>, KanbanTask>({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    board: { type: Schema.Types.ObjectId, ref: 'kanban_board', required: true },
    created_at: { type: Number, required: true },
    updated_at: { type: Number, required: true }
});

export const KanbanModel = model<Kanban, Model<Kanban, QueryHelper>>('kanban', schema, 'kanban');

export const KanbanBoardModel = model<KanbanBoard, Model<KanbanBoard, KanbanBoardQueryHelper>>('kanban_board', schemaBoard, 'kanban_board');

export const KanbanTaskModel = model<KanbanTask, Model<KanbanTask, KanbanTaskQueryHelper>>('kanban_task', schemaTask, 'kanban_task');