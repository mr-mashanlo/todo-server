export class DatabaseService {

  constructor( model ) {
    this.model = model;
  }

  getOne = async ( query ) => {
    return await this.model.findOne( query );
  };

  getMany = async ( query, option ) => {
    const { limit, page } = { limit: 10, page: 1, ...option };
    const skip = page > 0 ? ( page - 1 ) * limit : 0;
    const data = await this.model.find( query ).sort( { _id: -1 } ).limit( limit ).skip( skip );
    const total = await this.model.countDocuments( query );
    return { data, limit, total, page };
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