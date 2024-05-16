import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './module/module.module';
import { LibsModule } from './libs/libs.module';

@Module({
  imports: [ModuleModule, LibsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
