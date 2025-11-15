import { Router } from 'express';

import { HabitController } from '../controllers/habit-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { sessionMiddleware } from '../middlewares/session-middleware.js';
import { HabitModel, HabitZod } from '../models/habit.js';
import { ProgressModel } from '../models/progress.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( HabitZod );
const habitService = new DatabaseService( HabitModel );
const progressService = new DatabaseService( ProgressModel );
const databaseController = new HabitController( progressService, habitService, validatorManager );

router.post( '/', sessionMiddleware, databaseController.createAndUpdateProgress );
router.get( '/', sessionMiddleware, databaseController.getMany );
router.get( '/today', sessionMiddleware, databaseController.getToday );
router.get( '/:id', sessionMiddleware, databaseController.getOne );
router.put( '/:id', sessionMiddleware, databaseController.updateAndUpdateProgress );
router.delete( '/:id', sessionMiddleware, databaseController.removeAndUpdateProgress );

export { router as habitRouter };