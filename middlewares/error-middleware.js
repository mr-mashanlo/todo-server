import { ErrorManager } from '../helpers/error-manager.js';

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = ( err, req, res, next ) => {
  if ( err instanceof ErrorManager ) {
    return res.status( err.getStatus() ).json( { status: err.status, issues: err.issues } );
  };

  return res.status( 500 ).json( { status: 500, issues: [ { name: 'error', message: 'Something went wrong' } ] } );
};