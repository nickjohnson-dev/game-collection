export interface Cover {
  image_id: string;
  url: string;
}

export interface Game {
  cover?: Cover;
  id: number;
  name: string;
  platforms?: Platform[];
}

export interface Platform {
  abbreviation?: string;
  id: string;
  name: string;
}
