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
      const existsDocument = await this.databaseService.getOne( { user: id, date: data.date } );

      if ( existsDocument ) {
        const document = await this.databaseService.update( { user: id, date: data.date }, data );
        res.json( document );
      } else {
        const document = await this.databaseService.create( { user: id, ...data } );
        res.json( document );
      }
    } catch ( error ) {
      next( error );
    }
  };

}