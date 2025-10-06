export class SessionController {

  constructor( sessionService, tokenManager, cookieManager ) {
    this.sessionService = sessionService;
    this.tokenManager = tokenManager;
    this.cookieManager = cookieManager;
  };

  signIn = async ( req, res, next ) => {
    try {
      const { email, password } = req.body;
      const { _id: id } = await this.sessionService.signIn( { email, password } );
      const token = this.tokenManager.generate( { id } );
      this.cookieManager.save( res, token );
      res.json( { id, token } );
    } catch ( error ) {
      next( error );
    }
  };

  signUp = async ( req, res, next ) => {
    try {
      const { email, password } = req.body;
      const { _id: id } = await this.sessionService.signUp( { email, password } );
      const token = this.tokenManager.generate( { id } );
      this.cookieManager.save( res, token );
      res.json( { id, token } );
    } catch ( error ) {
      next( error );
    }
  };

  signOut = async ( req, res, next ) => {
    try {
      this.cookieManager.remove( res );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

  refresh = async ( req, res, next ) => {
    try {
      const { id } = req.params;
      const token = this.tokenManager.generate( { id } );
      this.cookieManager.save( res, token );
      res.json( { id, token } );
    } catch ( error ) {
      next( error );
    }
  };

};