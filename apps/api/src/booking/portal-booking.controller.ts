import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { StudentJwtGuard } from '../student-auth/guards/student-jwt.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';

/** Student-facing booking (`/portal/*`). */
@Controller('portal')
@UseGuards(StudentJwtGuard)
export class PortalBookingController {
  constructor(private readonly booking: BookingService) {}

  @Get('availability')
  availability() {
    return this.booking.availability();
  }

  @Post('bookings')
  create(@Body() dto: CreateBookingDto, @Req() req: Request) {
    const { id } = req.user as { id: string };
    return this.booking.createBooking(id, dto.start);
  }
}
