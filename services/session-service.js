export class SessionService {

  constructor( userService, validatorManager, bcryptManager, documentManager ) {
    this.userService = userService;
    this.validatorManager = validatorManager;
    this.bcryptManager = bcryptManager;
    this.documentManager = documentManager;
  };

  signIn = async ( data ) => {
    const { email, password } = this.validatorManager.parse( data );
    const document = await this.userService.getOne( { email } );
    this.documentManager.throwIfNotExists( document, 'Email' );
    this.bcryptManager.compare( password, document.password );
    return document;
  };

  signUp = async ( data ) => {
    const { email, password } = this.validatorManager.parse( data );
    const document = await this.userService.getOne( { email } );
    this.documentManager.throwIfExists( document, 'Email' );
    const hash = this.bcryptManager.hash( password );
    const createdDocument = await this.userService.create( { email, password: hash } );
    return createdDocument;
  };

};