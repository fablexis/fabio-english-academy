import { Module } from '@nestjs/common';
import { StudentsModule } from '../students/students.module';
import { StudentAuthModule } from '../student-auth/student-auth.module';
import { BookingModule } from '../booking/booking.module';
import { PortalController } from './portal.controller';
import { PortalService } from './portal.service';

@Module({
  imports: [StudentsModule, StudentAuthModule, BookingModule],
  controllers: [PortalController],
  providers: [PortalService],
})
export class PortalModule {}
