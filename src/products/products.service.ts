import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import createHttpError from 'http-errors';
import {
  Producer,
  ProducerDocument,
} from 'src/producers/schemas/producer.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
@Injectable()
export class ProductsService {
  //inject mongo db model
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Producer.name) private producerModel: Model<ProducerDocument>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async getById(id: string): Promise<Product> {
    if (!mongoose.isValidObjectId(id))
      throw new NotFoundException('Id of product is incorrect');

    return this.productModel.findById(id);
  }
  async create(productDto: CreateProductDto): Promise<Product> {
    //const pm = new Model<ProducerDocument>();
    try {
      let Producer;
      if (mongoose.isValidObjectId(productDto.producerId)) {
        Producer = await this.producerModel
          .findOne({ _id: productDto.producerId })
          .exec();
      } else {
        Producer = await this.producerModel
          .findOne({ name: productDto.producerId })
          .exec();
      }
      if (!Producer) throw createHttpError(401, 'Producer is incorrect.');

      const prodDto = { ...productDto };
      prodDto.producerId = Producer._id;
      console.log('' + prodDto.producerId);
      const newProduct = new this.productModel({
        title: prodDto.title,
        price: prodDto.price,
        img: prodDto.img,
        producerId: Producer._id,
      });

      return newProduct.save();
    } catch (e) {
      throw new NotFoundException('Products error: ' + e);
    }
  }
  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }
  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
