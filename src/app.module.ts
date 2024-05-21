import { Module } from '@nestjs/common';
import { DriverModule } from './module/driver/driver.module';
import { OwnerModule } from './module/owner/owner.module';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './libs/auth/auth.module';
import dbConfig from './libs/persistence/db-config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    load: [dbConfig],
    isGlobal: true,
  }),
    PersistenceModule,
    DriverModule,
    OwnerModule,
    AuthModule, 
  ],
  providers: [AuthModule],
})

export class AppModule {}