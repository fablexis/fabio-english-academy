import { Injectable } from '@nestjs/common';
import type { PortalDashboardDto } from '@eyb/shared';
import { ClassesService } from '../students/classes.service';
import { StudentAuthService } from '../student-auth/student-auth.service';
import { BookingService } from '../booking/booking.service';
import { SettingsService } from '../booking/settings.service';

@Injectable()
export class PortalService {
  constructor(
    private readonly auth: StudentAuthService,
    private readonly classes: ClassesService,
    private readonly booking: BookingService,
    private readonly settings: SettingsService,
  ) {}

  async dashboard(studentId: string): Promise<PortalDashboardDto> {
    const [student, classes, bookingEnabled, nextClassLabel] = await Promise.all([
      this.auth.getProfile(studentId),
      this.classes.listForStudent(studentId),
      this.settings.bookingEnabled(),
      this.booking.nextClassLabel(studentId),
    ]);
    return {
      student,
      classesCount: classes.length,
      topicsCount: classes.reduce((n, c) => n + c.topics.length, 0),
      bookingEnabled,
      nextClassLabel,
    };
  }
}
