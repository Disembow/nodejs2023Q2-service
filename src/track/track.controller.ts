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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.trackService.removeTrack(id);
  }
}
