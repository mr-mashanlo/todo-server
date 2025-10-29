import { model, Schema } from 'mongoose';
import z from 'zod';

export const ProgressZod = z.object( {
  date: z.string(),
  habits: z.number()
} );

export const ProgressSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, require: true, trim: true },
  habits: { type: Number }
} );

export const ProgressModel = model( 'Progress', ProgressSchema );