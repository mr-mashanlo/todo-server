import bcrypt from 'bcryptjs';

import { ErrorManager } from './error-manager.js';

export class BcryptManager {

  compare = ( password, hash ) => {
    const result = bcrypt.compareSync( password, hash );
    if ( !result ) throw new ErrorManager( { status: 400, issues: [ { name: 'password', message: 'Incorrect password' } ] } );
  };

  hash = ( password ) => {
    return bcrypt.hashSync( password, 7 );
  };

}