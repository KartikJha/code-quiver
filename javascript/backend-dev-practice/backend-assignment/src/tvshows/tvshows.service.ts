// src/tvshows/tvshows.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TVShow, TVShowDocument } from '../models/tvshow.schema';
import { CreateTVshowDto } from './dto/create-tvshow.dto';

@Injectable()
export class TVShowsService {
  constructor(
    @InjectModel(TVShow.name)
    private readonly tvShowModel: Model<TVShowDocument>,
  ) {}

  async findAll(): Promise<TVShow[]> {
    return this.tvShowModel.find().exec();
  }

  async create(createTVShowDto: CreateTVshowDto): Promise<TVShow> {
    const createdTVShow = new this.tvShowModel(createTVShowDto);
    return createdTVShow.save();
  }
}
