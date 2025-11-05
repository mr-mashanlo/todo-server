import { getWeekdayNumber } from '../helpers/get-days-number.js';
import { DatabaseController } from './database-controller.js';

export class HabitController extends DatabaseController {

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

}