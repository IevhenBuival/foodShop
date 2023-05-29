import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateUpdateCustomerDto } from './dto/create-update-customer.dto';
import { Customer } from './schemas/customer.schema';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  @Get()
  getAll(): Promise<Customer[]> {
    return this.customersService.getAll();
  }
  @Get(':name')
  getOne(@Param('name') name: string): Promise<Customer> {
    return this.customersService.getByName(name);
  }
  @Post()
  Create(@Body() customerDto: CreateUpdateCustomerDto): Promise<Customer> {
    return this.customersService.create(customerDto);
  }
  @Put()
  Update(@Body() updateDto: CreateUpdateCustomerDto): Promise<Customer> {
    return this.customersService.update(updateDto.name, updateDto);
  }
  @Delete(':id')
  Remove(@Param('id') id: string): Promise<Customer> {
    return this.customersService.remove(id);
  }
}
