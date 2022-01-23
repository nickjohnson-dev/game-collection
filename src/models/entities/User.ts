import { isString } from 'lodash';

interface UserConfig {
  id: string;
  name: string;
}

export class User {
  id: string;
  name: string;

  static create(config: UserConfig) {
    if (!isString(config.id)) {
      throw new TypeError('Invalid id');
    }

    if (!isString(config.name)) {
      throw new TypeError('Invalid name');
    }

    return new User(config);
  }

  private constructor(config: UserConfig) {
    this.id = config.id;
    this.name = config.name;
  }
}
