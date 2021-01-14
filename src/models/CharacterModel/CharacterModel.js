import { buildPublicUrl } from 'Helpers/UrlHelper';
import BaseModel from '../BaseModel';

export default class CharacterModel extends BaseModel {
  getUrl() {
    return buildPublicUrl(`character/${this.id}`);
  }
}
