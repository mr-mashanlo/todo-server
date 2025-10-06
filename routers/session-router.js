import { Router } from 'express';

import { SessionController } from '../controllers/session-controller.js';
import { BcryptManager } from '../helpers/bcrypt-manager.js';
import { CookieManager } from '../helpers/cookie-manager.js';
import { DocumentManager } from '../helpers/document-manager.js';
import { TokenManager } from '../helpers/token-manager.js';
import { ValidatorManager } from '../helpers/validator-manager.js';
import { sessionMiddleware } from '../middlewares/session-middleware.js';
import { UserModel, UserZod } from '../models/user.js';
import { SessionService } from '../services/session-service.js';
import { UserService } from '../services/user-service.js';

const router = Router();
const cookieManager = new CookieManager();
const tokenManager = new TokenManager();
const bcryptManager = new BcryptManager();
const documentManager = new DocumentManager();
const validatorManager = new ValidatorManager( UserZod );
const userService = new UserService( UserModel );
const sessionService = new SessionService( userService, validatorManager, bcryptManager, documentManager );
const sessionController = new SessionController( sessionService, tokenManager, cookieManager );

router.post( '/signin', sessionController.signIn );
router.post( '/signup', sessionController.signUp );
router.get( '/signout', sessionMiddleware, sessionController.signOut );
router.get( '/refresh', sessionMiddleware, sessionController.refresh );

export { router as sessionRouter };