export class CookieManager {

  save = ( res, token ) => {
    res.cookie( 'token', token, { maxAge: 7_200_000, httpOnly: true, sameSite: 'lax', secure: false } );
  };

  remove = ( res ) => {
    res.clearCookie( 'token' );
  };

}