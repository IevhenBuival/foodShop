import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { Producer, ProducerSchema } from './schemas/producer.schema';

@Module({
  providers: [ProducersService],
  controllers: [ProducersController],
  imports: [
    MongooseModule.forFeature([
      { name: Producer.name, schema: ProducerSchema },
    ]),
  ],
})
export class ProducersModule {}
