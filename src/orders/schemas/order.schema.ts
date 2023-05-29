import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IOrderString } from '../dto/create-order.dto';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  customerId: mongoose.Types.ObjectId;
  @Prop()
  producerId: mongoose.Types.ObjectId;

  @Prop()
  products: IOrderString[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
