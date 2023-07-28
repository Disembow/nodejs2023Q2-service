import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  updateAlbum(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.albumService.removeAlbum(id);
  }
}
