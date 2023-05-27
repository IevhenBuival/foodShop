import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  //inject mongo db model
  constructor(
    @InjectModel(Order.name) private productModel: Model<OrderDocument>,
  ) {}

  async getAll(): Promise<Order[]> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Order> {
    return this.productModel.findById(id);
  }
  async create(producucerDto: CreateOrderDto): Promise<Order> {
    const newProduct = new this.productModel(producucerDto);

    return newProduct.save();
  }
  async remove(id: string): Promise<Order> {
    return this.productModel.findByIdAndRemove(id);
  }
}
