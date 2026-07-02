import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { StudentJwtGuard } from '../student-auth/guards/student-jwt.guard';
import { ClassesService } from '../students/classes.service';
import { PortalService } from './portal.service';

/** Student dashboard + class reads (`/portal/*`). */
@Controller('portal')
@UseGuards(StudentJwtGuard)
export class PortalController {
  constructor(
    private readonly portal: PortalService,
    private readonly classes: ClassesService,
  ) {}

  @Get('profile')
  profile(@Req() req: Request) {
    const { id } = req.user as { id: string };
    return this.portal.dashboard(id);
  }

  @Get('classes')
  list(@Req() req: Request) {
    const { id } = req.user as { id: string };
    return this.classes.listForStudent(id);
  }

  @Get('classes/:classId')
  detail(@Param('classId') classId: string, @Req() req: Request) {
    const { id } = req.user as { id: string };
    return this.classes.getForStudent(id, classId);
  }
}
