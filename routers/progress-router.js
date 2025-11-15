import { Router } from 'express';

import { ProgressController } from '../controllers/progress-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { sessionMiddleware } from '../middlewares/session-middleware.js';
import { HabitModel } from '../models/habit.js';
import { ProgressModel, ProgressZod } from '../models/progress.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( ProgressZod );
const habitService = new DatabaseService( HabitModel );
const databaseService = new DatabaseService( ProgressModel );
const databaseController = new ProgressController( habitService, databaseService, validatorManager );

router.post( '/', sessionMiddleware, databaseController.upgrade );
router.get( '/', sessionMiddleware, databaseController.getMany );
router.get( '/today', sessionMiddleware, databaseController.getToday );
router.get( '/:id', sessionMiddleware, databaseController.getOne );
router.put( '/:id', sessionMiddleware, databaseController.update );
router.delete( '/:id', sessionMiddleware, databaseController.remove );

export { router as progressRouter };