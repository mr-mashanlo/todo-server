import jwt from 'jsonwebtoken';

import { ErrorManager } from './error-manager.js';

export class TokenManager {

  generate = ( id ) => {
    return jwt.sign( { id }, process.env.SECRET_KEY || '', { expiresIn: '2h' } );
  };

  validate = ( token ) => {
    try {
      return jwt.verify( token, process.env.SECRET_KEY || '' );
    } catch ( error ) {
      throw new ErrorManager( { status: 400, issues: [ { name: 'token', message: error.message } ] } );
    }
  };

  decode = ( token ) => {
    return jwt.decode( token );
  };

}