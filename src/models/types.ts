export interface Cover {
  url: string;
}

export interface Game {
  cover?: Cover;
  id: number;
  name: string;
}
