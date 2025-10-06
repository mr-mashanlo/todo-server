import { ErrorManager } from './error-manager.js';

export class ValidatorManager {

  constructor( schema ) {
    this.schema = schema;
  }

  parse = ( data ) => {
    const result = this.schema.safeParse( data );
    if ( !result.success ) {
      const issues = result.error.issues.map( error => ( { name: error.path[0], message: error.message } ) );
      throw new ErrorManager( { status: 400, issues } );
    }
    return result.data;
  };

}