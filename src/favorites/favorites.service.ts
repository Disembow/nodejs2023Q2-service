import { Injectable } from '@nestjs/common';
import { db } from '../database/db';

@Injectable()
export class FavoritesService {
  getFavorites() {
    const response = {
      albums: [],
      artists: [],
      tracks: [],
    };

    db.favorites.albums.map((id) => {
      const album = db.albums.find((a) => a.id === id);
      if (album) response.albums.push(album);
    });

    db.favorites.artists.map((id) => {
      const artist = db.artists.find((a) => a.id === id);
      if (artist) response.artists.push(artist);
    });

    db.favorites.tracks.map((id) => {
      const track = db.tracks.find((t) => t.id === id);
      if (track) response.tracks.push(track);
    });

    return response;
  }
}
