import { Injectable } from '@nestjs/common';
import { db } from '../database/db';

@Injectable()
export class FavoritesService {
  getFavorites() {
    return db.favorites;
  }
}
