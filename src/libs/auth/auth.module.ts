import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DriverModule } from 'src/module/driver/driver.module';
import { OwnerModule } from 'src/module/owner/owner.module';

@Module({
  imports: [
    DriverModule,
    OwnerModule,
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'lD9QW7Lg8LK5p0LwRpSFS8BGmOkgT5O7PKbV5Ic8JRY=',
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
