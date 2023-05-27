import mongoose from 'mongoose';

export class CreateProductDto {
  readonly title: string;
  readonly price: number;
  readonly img: string;
  readonly producerId?: string | mongoose.Schema.Types.ObjectId;
}
