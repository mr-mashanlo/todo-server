import { ErrorManager } from '../helpers/error-manager.js';

export const sessionMiddleware = async ( req, res, next ) => {
  try {
    const token = req.cookies.token;
    if ( !token ) throw new ErrorManager( { status: 419, issues: [ { name: 'token', message: 'Token not found' } ] } );
    next();
  } catch ( error ) {
    next( error );
  }
};