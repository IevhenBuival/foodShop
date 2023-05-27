import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.getById(id);
  }
  @Post()
  Create(
    @Body() customerDto: CreateUpdateCustomerDto,
    @Param('name') name: string,
  ): Promise<Customer> {
    return this.customersService.update(name, customerDto);
  }
  @Delete(':id')
  Remove(@Param('id') id: string): Promise<Customer> {
    return this.customersService.remove(id);
  }
}
