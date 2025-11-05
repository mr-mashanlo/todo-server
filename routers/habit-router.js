import { Router } from 'express';

import { HabitController } from '../controllers/habit-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { sessionMiddleware } from '../middlewares/session-middleware.js';
import { HabitModel, HabitZod } from '../models/habit.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( HabitZod );
const databaseService = new DatabaseService( HabitModel );
const databaseController = new HabitController( databaseService, validatorManager );

router.post( '/', sessionMiddleware, databaseController.create );
router.get( '/', sessionMiddleware, databaseController.getMany );
router.get( '/today', sessionMiddleware, databaseController.getToday );
router.get( '/:id', sessionMiddleware, databaseController.getOne );
router.put( '/:id', sessionMiddleware, databaseController.update );
router.delete( '/:id', sessionMiddleware, databaseController.remove );

export { router as habitRouter };