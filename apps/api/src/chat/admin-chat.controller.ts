import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivityService, type Actor } from '../activity/activity.service';
import { ChatService } from './chat.service';
import { TeacherReplyDto } from './dto';

/** Tutor-facing conversations (`/admin/students/:id/chat`). */
@Controller('admin/students/:id/chat')
@UseGuards(JwtAuthGuard)
export class AdminChatController {
  constructor(
    private readonly chat: ChatService,
    private readonly activity: ActivityService,
  ) {}

  @Get()
  thread(@Param('id') id: string) {
    return this.chat.threadForAdmin(id);
  }

  @Post()
  async reply(
    @Param('id') id: string,
    @Body() dto: TeacherReplyDto,
    @Req() req: Request,
  ) {
    const msg = await this.chat.teacherReply(id, dto.text);
    const name = await this.chat.studentName(id);
    this.activity.log(req.user as Actor, {
      action: 'update',
      entity: 'chat',
      entityId: id,
      summary: `Respondió en el chat de ${name}`,
    });
    return msg;
  }
}
