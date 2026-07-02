import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivityService, type Actor } from '../activity/activity.service';
import { UsersService } from './users.service';
import { InviteUserDto, UpdateUserDto } from './dto';

@Controller('admin/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly users: UsersService,
    private readonly activity: ActivityService,
  ) {}

  @Get()
  list() {
    return this.users.list();
  }

  @Post()
  async invite(@Body() dto: InviteUserDto, @Req() req: Request) {
    const actor = req.user as Actor;
    const created = await this.users.invite(dto.email, actor.email, dto.name);
    this.activity.log(actor, {
      action: 'invite',
      entity: 'user',
      entityId: created.email,
      summary: `Invitó a ${created.email} como administrador`,
    });
    return created;
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const actor = req.user as Actor;
    const email = await this.users.update(id, dto);
    this.activity.log(actor, {
      action: 'update',
      entity: 'user',
      entityId: email,
      summary: `Actualizó los datos de ${email}`,
    });
    return { ok: true };
  }

  @Post(':id/invite')
  @HttpCode(200)
  async resend(@Param('id') id: string, @Req() req: Request) {
    const actor = req.user as Actor;
    await this.users.resendInvite(id, actor.email);
    this.activity.log(actor, {
      action: 'invite',
      entity: 'user',
      entityId: id,
      summary: 'Reenvió una invitación pendiente',
    });
    return { ok: true };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const actor = req.user as Actor;
    const email = await this.users.remove(id, actor.id);
    this.activity.log(actor, {
      action: 'delete',
      entity: 'user',
      entityId: email,
      summary: `Eliminó la cuenta de ${email}`,
    });
  }
}
