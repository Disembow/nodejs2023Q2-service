import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtist(dto);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    return this.artistService.updateArtist(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.artistService.removeArtist(id);
  }
}
