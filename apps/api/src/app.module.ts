import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PagesModule } from './pages/pages.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';
import { StudentAuthModule } from './student-auth/student-auth.module';
import { StudentsModule } from './students/students.module';
import { PortalModule } from './portal/portal.module';
import { ChatModule } from './chat/chat.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ActivityModule,
    AuthModule,
    BlogModule,
    PagesModule,
    UploadsModule,
    UsersModule,
    // Student portal + admin extensions.
    StudentAuthModule,
    StudentsModule,
    PortalModule,
    ChatModule,
    BookingModule,
  ],
})
export class AppModule {}
