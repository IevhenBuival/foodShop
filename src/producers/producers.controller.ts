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
import { CreateProducerDto } from './dto/create-producer.dto';
import { ProducersService } from './producers.service';
import { Producer } from './schemas/producer.schema';

@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Get()
  getAll(): Promise<Producer[]> {
    return this.producersService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Producer> {
    return this.producersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  Create(@Body() createProductDto: CreateProducerDto): Promise<Producer> {
    return this.producersService.create(createProductDto);
  }
  @Delete(':id')
  Remove(@Param('id') id: string): Promise<Producer> {
    return this.producersService.remove(id);
  }
}
