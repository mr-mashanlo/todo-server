import { model, Schema } from 'mongoose';
import z from 'zod';

export const ProgressZod = z.object( {
  date: z.string(),
  habits: z.array( z.object( { habit: z.string(), completed: z.boolean() } ) )
} );

export const ProgressSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, require: true },
  habits: [ { habit: { type: Schema.Types.ObjectId, ref: 'Habit' }, completed: { type: Boolean, default: false } } ]
} );

export const ProgressModel = model( 'Progress', ProgressSchema );