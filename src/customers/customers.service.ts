import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUpdateCustomerDto } from './dto/create-update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  //inject mongo db model
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async getAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async getByName(name: string): Promise<Customer> {
    return this.customerModel.findOne({ name: name }).exec();
  }
  async create(customerDto: CreateUpdateCustomerDto): Promise<Customer> {
    const newProduct = new this.customerModel(customerDto);
    return newProduct.save();
  }
  async update(
    name: string,
    customerDto: CreateUpdateCustomerDto,
  ): Promise<Customer> {
    const exist = await this.customerModel.findOne({ name: name }).exec();
    if (!exist) {
      const newProduct = new this.customerModel(customerDto);
      return newProduct.save();
    }

    return this.customerModel.findOneAndUpdate({ name: name }, customerDto, {
      new: true,
    });
  }
  async remove(id: string): Promise<Customer> {
    return this.customerModel.findByIdAndRemove(id);
  }
}
