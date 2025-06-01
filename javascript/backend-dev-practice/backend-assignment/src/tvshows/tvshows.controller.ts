import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TVShowsService } from './tvshows.service';
import { CreateTVshowDto } from './dto/create-tvshow.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TV Shows')
@Controller('tvshows')
export class TVShowsController {
  constructor(private readonly tvShowsService: TVShowsService) {}

  @Get()
  async findAll() {
    return this.tvShowsService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) // Apply validation using ValidationPipe
  async create(@Body() createTVShowDto: CreateTVshowDto) {
    return this.tvShowsService.create(createTVShowDto);
  }
}
