export class SessionManager {

  save = ( res, id ) => {
    res.user = { id };
  };

  remove = ( res ) => {
    delete res.user;
  };

}