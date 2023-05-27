import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProducerDocument = Producer & Document;

@Schema()
export class Producer {
  @Prop()
  name: string;
}

export const ProducerSchema = SchemaFactory.createForClass(Producer);
