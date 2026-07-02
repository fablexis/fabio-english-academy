import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StudentAuthController } from './student-auth.controller';
import { StudentAuthService } from './student-auth.service';
import { StudentJwtStrategy } from './strategies/student-jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [StudentAuthController],
  providers: [StudentAuthService, StudentJwtStrategy],
  exports: [StudentAuthService],
})
export class StudentAuthModule {}
