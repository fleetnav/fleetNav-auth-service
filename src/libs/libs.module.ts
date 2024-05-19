import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule, AuthModule],
})
export class LibsModule {}
