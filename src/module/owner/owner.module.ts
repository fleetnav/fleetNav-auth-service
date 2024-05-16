import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { SerivicesService } from './serivices/serivices.service';

@Module({
  controllers: [ControllersController],
  providers: [SerivicesService]
})
export class OwnerModule {}
