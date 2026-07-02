import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivityService } from './activity.service';

@Controller('admin/activity')
@UseGuards(JwtAuthGuard)
export class ActivityController {
  constructor(private readonly activity: ActivityService) {}

  @Get()
  list(
    @Query('entity') entity?: string,
    @Query('action') action?: string,
    @Query('before') before?: string,
    @Query('take') take?: string,
  ) {
    return this.activity.list({
      entity: entity || undefined,
      action: action || undefined,
      before: before ? Number(before) : undefined,
      take: take ? Number(take) : undefined,
    });
  }
}
