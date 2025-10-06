export class UserService {

  constructor( model ) {
    this.model = model;
  }

  getOne = async ( query ) => {
    return await this.model.findOne( query );
  };

  getMany = async ( query ) => {
    return await this.model.find( query );
  };

  create = async ( data ) => {
    return await this.model.create( data );
  };

  update = async ( query, data ) => {
    return await this.model.findOneAndUpdate( query, data, { new: true } );
  };

  remove = async ( query ) => {
    return await this.model.deleteMany( query );
  };

}