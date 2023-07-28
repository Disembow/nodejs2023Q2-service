import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  duration: number;
}
