import { ErrorManager } from './error-manager.js';

export class DocumentManager {

  throwIfExists = ( document, name = 'Document', status = 409 ) => {
    if ( document ) throw new ErrorManager( { status, issues: [ { name: name.toLowerCase(), message: `${name} is already exist` } ] } );
  };

  throwIfNotExists = ( document, name = 'Document', status = 404 ) => {
    if ( !document ) throw new ErrorManager( { status, issues: [ { name: name.toLowerCase(), message: `${name} is not exist` } ] } );
  };

}