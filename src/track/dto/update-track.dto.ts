import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  artistId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  albumId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  duration: number;
}
