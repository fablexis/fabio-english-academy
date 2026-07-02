import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { StudentJwtGuard } from '../student-auth/guards/student-jwt.guard';
import { ChatService } from './chat.service';
import { SendChatDto } from './dto';

/** Student-facing Buddy chat (`/portal/chat`). */
@Controller('portal/chat')
@UseGuards(StudentJwtGuard)
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Get()
  history(@Req() req: Request) {
    const { id } = req.user as { id: string };
    return this.chat.historyForStudent(id);
  }

  @Post()
  send(@Body() dto: SendChatDto, @Req() req: Request) {
    const { id } = req.user as { id: string };
    return this.chat.sendStudentMessage(id, dto.text);
  }
}
