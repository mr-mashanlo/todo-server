import { DocumentManager } from '../helpers/document-manager.js';
import { SessionManager } from '../helpers/session-manager.js';

const sessionManager = new SessionManager();
const documentManager = new DocumentManager();

export const sessionMiddleware = async ( req, res, next ) => {
  try {
    const token = req.cookies.token;
    documentManager.throwIfNotExists( token, 'Token', 401 );

    const { id, exp } = sessionManager.verify( token );
    req.user = { id };

    const time = exp - Math.floor( Date.now() / 1000 );
    if ( time < 1800 ) sessionManager.issue( res, { id } );

    next();
  } catch ( error ) {
    next( error );
  }
};