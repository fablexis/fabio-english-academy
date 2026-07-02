import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PortalBookingController } from './portal-booking.controller';
import { AdminBookingController } from './admin-booking.controller';
import { BookingService } from './booking.service';
import { SettingsService } from './settings.service';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [PortalBookingController, AdminBookingController],
  providers: [BookingService, SettingsService, GoogleCalendarService],
  exports: [BookingService, SettingsService],
})
export class BookingModule {}
