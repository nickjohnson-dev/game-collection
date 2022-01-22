export interface Cover {
  image_id: string;
  url: string;
}

export interface Game {
  cover?: Cover;
  id: number;
  name: string;
}
