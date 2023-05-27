import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUpdateCustomerDto } from './dto/create-update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  //inject mongo db model
  constructor(
    @InjectModel(Customer.name) private productModel: Model<CustomerDocument>,
  ) {}

  async getAll(): Promise<Customer[]> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Customer> {
    return this.productModel.findById(id);
  }
  async update(
    name: string,
    customerDto: CreateUpdateCustomerDto,
  ): Promise<Customer> {
    return this.productModel.findOneAndUpdate({ name: name }, customerDto, {
      new: true,
    });
  }
  async remove(id: string): Promise<Customer> {
    return this.productModel.findByIdAndRemove(id);
  }
}
