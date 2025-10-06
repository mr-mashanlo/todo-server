import { ErrorManager } from './error-manager.js';

export class DocumentManager {

  throwIfExists = ( document, name ) => {
    if ( document ) throw new ErrorManager( { status: 400, issues: [ { name: name.toLowerCase(), message: `${name} is already exist` } ] } );
  };

  throwIfNotExists = ( document, name ) => {
    if ( !document ) throw new ErrorManager( { status: 400, issues: [ { name: name.toLowerCase(), message: `${name} is not exist` } ] } );
  };

}