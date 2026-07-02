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
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Controller('admin/students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(
    private readonly students: StudentsService,
    private readonly activity: ActivityService,
  ) {}

  @Get()
  list() {
    return this.students.list();
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.students.detail(id);
  }

  @Post()
  async create(@Body() dto: CreateStudentDto, @Req() req: Request) {
    const student = await this.students.create(dto);
    this.activity.log(req.user as Actor, {
      action: 'create',
      entity: 'student',
      entityId: student.id,
      summary: `Creó al estudiante «${student.name}»`,
    });
    return student;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStudentDto,
    @Req() req: Request,
  ) {
    await this.students.update(id, dto);
    const name = await this.students.requireName(id);
    this.activity.log(req.user as Actor, {
      action: 'update',
      entity: 'student',
      entityId: id,
      summary: `Actualizó los datos de «${name}»`,
    });
    return { ok: true };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const name = await this.students.requireName(id);
    await this.students.remove(id);
    this.activity.log(req.user as Actor, {
      action: 'delete',
      entity: 'student',
      entityId: id,
      summary: `Eliminó al estudiante «${name}»`,
    });
  }

  @Post(':id/reset-password')
  @HttpCode(200)
  async resetPassword(@Param('id') id: string, @Req() req: Request) {
    const { password, name } = await this.students.resetPassword(id);
    this.activity.log(req.user as Actor, {
      action: 'update',
      entity: 'student',
      entityId: id,
      summary: `Restableció la contraseña de «${name}»`,
    });
    return { password };
  }
}
