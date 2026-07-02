import { Module } from '@nestjs/common';
import { StudentsModule } from '../students/students.module';
import { ChatController } from './chat.controller';
import { AdminChatController } from './admin-chat.controller';
import { ChatService } from './chat.service';
import { AiService } from './ai.service';

@Module({
  imports: [StudentsModule],
  controllers: [ChatController, AdminChatController],
  providers: [ChatService, AiService],
  exports: [ChatService],
})
export class ChatModule {}
