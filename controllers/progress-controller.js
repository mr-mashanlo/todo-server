import moment from 'moment';

import { DatabaseController } from './database-controller.js';

export class ProgressController extends DatabaseController {

  constructor( habitService, databaseService, validatorManager ) {
    super( databaseService, validatorManager );
    this.habitService = habitService;
  }

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
      const weight = await this.habitService.count( { user: id, days: { $in: new Date().getDay().toString() } } );

      if ( existsDocument ) {
        const document = await this.databaseService.update( { user: id, date: data.date }, { ...data, weight } );
        res.json( document );
      } else {
        const document = await this.databaseService.create( { ...data, user: id, weight } );
        res.json( document );
      }
    } catch ( error ) {
      next( error );
    }
  };

}