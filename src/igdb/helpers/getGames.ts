import { Game } from '../../models';
import { queryIGDB } from './queryIGDB';

export interface GetGamesOptions {
  searchQuery?: string;
}

export async function getGames({
  searchQuery = '',
}: GetGamesOptions = {}): Promise<Game[]> {
  try {
    const res = await queryIGDB()
      .fields(
        'cover.*,id,name,platforms.abbreviation,platforms.id,platforms.name',
      )
      .search(searchQuery)
      .limit(50)
      .request('/games');

    return res.data as Game[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
