import { Module } from '@nestjs/common';
import { PersistanceModule } from './persistance/persistance.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PersistanceModule, AuthModule]
})
export class LibsModule {}
