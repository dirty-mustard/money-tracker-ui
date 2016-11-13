declare var _ : any;

export class Error {

  public error: string = undefined;
  public errorDetails: Object;

  constructor(error: string, errorDetails: Object) {
    this.error = error;
    this.errorDetails = errorDetails;
  }

  public static fromJson(json: Object) : Error {
    let error = (!_.isUndefined(json['error'])) ? json['error'] : 'Unknown error';
    let errorDetails = (!_.isUndefined(json['errorDetails'])) ? json['errorDetails'] : {};
    return new Error(error, errorDetails);
  }

}
