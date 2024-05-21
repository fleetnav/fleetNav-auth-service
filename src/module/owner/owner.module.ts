import { Module } from '@nestjs/common';
import { OwnerService } from './serivices/owner.service';
import { OwnerController } from './controllers/owner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner, OwnerSchema } from './entities/owner.entity';
import { Driver, DriverSchema } from '../driver/entities/driver.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Owner.name, 
        schema: OwnerSchema },
      { name: Driver.name, 
        schema: DriverSchema }]),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}