import { Router } from 'express';

import { DatabaseController } from '../controllers/database-controller.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { sessionMiddleware } from '../middlewares/session-middleware.js';
import { ProgressModel, ProgressZod } from '../models/progress.js';
import { DatabaseService } from '../services/database-service.js';

const router = Router();
const validatorManager = new ValidatorManager( ProgressZod );
const databaseService = new DatabaseService( ProgressModel );
const databaseController = new DatabaseController( databaseService, validatorManager );

router.post( '/', sessionMiddleware, databaseController.create );
router.get( '/', sessionMiddleware, databaseController.getMany );
router.get( '/:id', sessionMiddleware, databaseController.getOne );
router.put( '/:id', sessionMiddleware, databaseController.update );
router.delete( '/:id', sessionMiddleware, databaseController.remove );

export { router as progressRouter };