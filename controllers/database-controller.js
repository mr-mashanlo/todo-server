export class DatabaseController {

  constructor( databaseService, validatorManager ) {
    this.databaseService = databaseService;
    this.validatorManager = validatorManager;
  };

  getOne = async ( req, res, next ) => {
    try {
      const { id } = req.params;
      const document = await this.databaseService.getOne( { _id: id } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getMany = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      const { limit = 10, page = 1 } = req.query;
      const document = await this.databaseService.getMany( { user: id }, { limit: +limit, page: +page } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const data = req.body;
      const { id } = req.user;
      const validatedData = this.validatorManager.parse( data );
      const document = await this.databaseService.create( { user: id, ...validatedData } );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const validatedData = this.validatorManager.parse( data );
      const document = await this.databaseService.update( { _id: id }, validatedData );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  remove = async ( req, res, next ) => {
    try {
      const { id } = req.params;
      await this.databaseService.remove( { _id: id } );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

};