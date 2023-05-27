import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Producer } from 'src/producers/schemas/producer.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producers',
    default: null,
  })
  producerId: Producer;

  @Prop()
  img: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
