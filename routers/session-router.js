import { Router } from 'express';

import { SessionController } from '../controllers/session-controller.js';
import { BcryptManager } from '../helpers/bcrypt-manager.js';
import { DocumentManager } from '../helpers/document-manager.js';
import { SessionManager } from '../helpers/session-manager.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { sessionMiddleware } from '../middlewares/session-middleware.js';
import { UserModel, UserZod } from '../models/user.js';
import { DatabaseService } from '../services/database-service.js';
import { SessionService } from '../services/session-service.js';

const router = Router();
const sessionManager = new SessionManager();
const bcryptManager = new BcryptManager();
const documentManager = new DocumentManager();
const validatorManager = new ValidatorManager( UserZod );
const databaseService = new DatabaseService( UserModel );
const sessionService = new SessionService( databaseService, validatorManager, bcryptManager, documentManager );
const sessionController = new SessionController( sessionService, sessionManager );

router.post( '/signin', sessionController.signIn );
router.post( '/signup', sessionController.signUp );
router.get( '/signout', sessionMiddleware, sessionController.signOut );
router.get( '/refresh', sessionMiddleware, sessionController.refresh );

export { router as sessionRouter };