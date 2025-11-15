import { model, Schema } from 'mongoose';
import z from 'zod';

export const ProgressZod = z.object( {
  date: z.string(),
  habits: z.array( z.string() )
} );

export const ProgressSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, require: true },
  habits: [ { type: Schema.Types.ObjectId, ref: 'Habit' } ],
  weight: { type: Number, default: 0 }
} );

export const ProgressModel = model( 'Progress', ProgressSchema );