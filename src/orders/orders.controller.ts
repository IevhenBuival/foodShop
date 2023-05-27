import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  Create(@Body() createProductDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createProductDto);
  }
  @Delete(':id')
  Remove(@Param('id') id: string): Promise<Order> {
    return this.orderService.remove(id);
  }
}
