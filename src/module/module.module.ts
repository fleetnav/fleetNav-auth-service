import { Module } from '@nestjs/common';
import { OwnerModule } from './owner/owner.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [OwnerModule, DriverModule]
})
export class ModuleModule {}
