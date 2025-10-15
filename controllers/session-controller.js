export class SessionController {

  constructor( sessionService, sessionManager ) {
    this.sessionService = sessionService;
    this.sessionManager = sessionManager;
  };

  signIn = async ( req, res, next ) => {
    try {
      const { email, password } = req.body;
      const { _id: id } = await this.sessionService.signIn( { email, password } );
      const { token, expired } = this.sessionManager.issue( res, { id } );
      res.json( { id, token, expired } );
    } catch ( error ) {
      next( error );
    }
  };

  signUp = async ( req, res, next ) => {
    try {
      const { email, password } = req.body;
      const { _id: id } = await this.sessionService.signUp( { email, password } );
      const { token, expired } = this.sessionManager.issue( res, { id } );
      res.json( { id, token, expired } );
    } catch ( error ) {
      next( error );
    }
  };

  signOut = async ( req, res, next ) => {
    try {
      this.sessionManager.revoke( res );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

  refresh = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      const { token, expired } = this.sessionManager.issue( res, { id } );
      res.json( { id, token, expired } );
    } catch ( error ) {
      next( error );
    }
  };

};