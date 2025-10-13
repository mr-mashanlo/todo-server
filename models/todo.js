import { model, Schema } from 'mongoose';
import z from 'zod';

export const TodoZod = z.object( {
  title: z.string()
} );

export const TodoSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, require: true, trim: true },
  created: { type: Number, require: true },
  updated: { type: Number, require: true },
  completed: { type: Boolean, default: false }
} );

export const TodoModel = model( 'Todo', TodoSchema );