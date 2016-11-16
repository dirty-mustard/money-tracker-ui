declare var _: any;

export class Tag {

  public id: number = undefined;
  public name: string = undefined;
  public color: string = undefined;

  public static fromJson(json: Object) : Tag {
    let tag = new Tag();
    _.each(_.keys(tag), p => {
      if (_.contains(_.keys(json), p)) {
        tag[p] = json[p] ;
      }
    });

    return tag;
  }
}
