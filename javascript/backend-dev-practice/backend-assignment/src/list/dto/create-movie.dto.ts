import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDate,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  actors: string[];
}
