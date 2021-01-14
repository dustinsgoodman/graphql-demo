export default class BaseModel {
  constructor(data) {
    Object.entries(data).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
