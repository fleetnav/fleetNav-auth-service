import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DriverModule } from 'src/module/driver/driver.module';
import { OwnerModule } from 'src/module/owner/owner.module';

@Module({
  imports: [DriverModule, OwnerModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'mi-semilla-secreta',
    signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '60s' }
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}