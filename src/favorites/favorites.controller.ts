import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('album/:id')
  @HttpCode(201)
  setAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.setAlbumToFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  setArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.setArtistToFavorites(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  setTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.setTrackToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }
}
