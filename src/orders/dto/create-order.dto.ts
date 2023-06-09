import mongoose from 'mongoose';

export interface IOrderString {
  productID: mongoose.Types.ObjectId;
  count: number;
}
export class CreateOrderDto {
  readonly customerID: string;
  readonly producerID: string;
  readonly order: IOrderString[];
}
