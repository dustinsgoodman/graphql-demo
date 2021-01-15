import { buildPublicUrl } from 'Helpers/UrlHelper';
import BaseModel from '../BaseModel';

export default class LocationModel extends BaseModel {
  getUrl() {
    return buildPublicUrl(`location/${this.id}`);
  }
}
