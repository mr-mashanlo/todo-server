import { model, Schema } from 'mongoose';
import z from 'zod';

export const HabitZod = z.object( {
  title: z.string(),
  days: z.array( z.string() )
} );

export const HabitSchema = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, require: true, trim: true },
  days: [ { type: String } ]
} );

export const HabitModel = model( 'Habit', HabitSchema );