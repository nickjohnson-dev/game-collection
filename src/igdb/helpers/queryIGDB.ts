import igdb from 'igdb-api-node';

export function queryIGDB() {
  return igdb(process.env.TWITCH_CLIENT_ID, process.env.IGDB_TOKEN);
}
