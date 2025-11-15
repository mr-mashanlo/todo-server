import moment from 'moment';

import { getWeekdayNumber } from '../helpers/get-days-number.js';
import { DatabaseController } from './database-controller.js';

export class HabitController extends DatabaseController {

  constructor( progressService, databaseService, validatorManager ) {
    super( databaseService, validatorManager );
    this.progressService = progressService;
  }

  getToday = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      const [ first ] = getWeekdayNumber();
      const document = await this.databaseService.getMany( { user: id, days: { $in: [ first ] } }, { limit: 0 } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  createAndUpdateProgress = async ( req, res, next ) => {
    try {
      const data = req.body;
      const { id: user } = req.user;
      const validatedData = this.validatorManager.parse( data );
      const document = await this.databaseService.create( { user, ...validatedData } );

      const date = moment().format( 'YYYYMMDD' );
      const today = new Date().getDay().toString();
      const weight = await this.databaseService.count( { user, days: { $in: today } } );

      if ( weight ) {
        await this.progressService.update( { user, date }, { weight } );
      };

      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  updateAndUpdateProgress = async ( req, res, next ) => {
    try {
      const data = req.body;
      const { id } = req.params;
      const { id: user } = req.user;
      const validatedData = this.validatorManager.parse( data );
      const document = await this.databaseService.update( { _id: id }, validatedData );

      const date = moment().format( 'YYYYMMDD' );
      const today = new Date().getDay().toString();
      const weight = await this.databaseService.count( { user, days: { $in: today } } );
      await this.progressService.update( { user, date }, { weight } );

      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  removeAndUpdateProgress = async ( req, res, next ) => {
    try {
      const { id } = req.params;
      const { id: user } = req.user;
      await this.databaseService.remove( { _id: id } );

      const date = moment().format( 'YYYYMMDD' );
      const today = new Date().getDay().toString();
      const weight = await this.databaseService.count( { user, days: { $in: today } } );

      await this.progressService.update( { user, date }, { weight, $pull: { habits: id } } );

      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

}