import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProducerDto } from './dto/create-producer.dto';
import { Producer, ProducerDocument } from './schemas/producer.schema';

@Injectable()
export class ProducersService {
  //inject mongo db model
  constructor(
    @InjectModel(Producer.name) private productModel: Model<ProducerDocument>,
  ) {}

  async getAll(): Promise<Producer[]> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Producer> {
    return this.productModel.findById(id);
  }
  async create(producucerDto: CreateProducerDto): Promise<Producer> {
    const newProduct = new this.productModel(producucerDto);

    return newProduct.save();
  }
  async remove(id: string): Promise<Producer> {
    return this.productModel.findByIdAndRemove(id);
  }
}
