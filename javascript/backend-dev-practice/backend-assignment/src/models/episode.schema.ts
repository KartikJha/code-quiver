import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EpisodeDocument = Episode & Document;

@Schema()
export class Episode {
  @Prop({ required: true })
  episodeNumber: number;

  @Prop({ required: true })
  seasonNumber: number;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String] })
  actors: string[];
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
