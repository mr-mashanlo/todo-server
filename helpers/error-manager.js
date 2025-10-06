export class ErrorManager extends Error {

  constructor( { status, issues } ) {
    super();
    this.status = status;
    this.issues = issues;
  }

  getStatus = () => this.status;

}