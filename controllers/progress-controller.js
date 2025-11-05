import moment from 'moment';

import { DatabaseController } from './database-controller.js';

export class ProgressController extends DatabaseController {

  getToday = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      const date = moment().format( 'YYYYMMDD' );
      const document = await this.databaseService.getOne( { user: id, date } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  upgrade = async ( req, res, next ) => {
    try {
      const data = req.body;
      const { id } = req.user;
      const validatedData = this.validatorManager.parse( data );
      const existsDocument = await this.databaseService.getOne( { user: id, date: validatedData.date } );

      if ( existsDocument ) {
        const document = await this.databaseService.update( { user: id, date: validatedData.date }, validatedData );
        res.json( document );
      } else {
        const document = await this.databaseService.create( { user: id, ...validatedData } );
        res.json( document );
      }
    } catch ( error ) {
      next( error );
    }
  };

}