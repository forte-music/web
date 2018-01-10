export const songs = '/songs';
export const song = (id: string) => `${songs}/${id}`;

export const artists = `/artists`;
export const artist = (id: string) => `${artists}/${id}`;

export const albums = `/albums`;
export const album = (id: string) => `${albums}/${id}`;

export const playlists = `/playlists`;
export const playlist = (id: string) => `${playlists}/${id}`;

export const home = `/home`;
export const queue = `/queue`;
export const search = `/search`;
