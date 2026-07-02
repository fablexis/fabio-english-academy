import {
  Body,
  Controller,
  Delete,
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
import { ClassesService } from './classes.service';
import { StudentsService } from './students.service';
import { ClassDto } from './dto';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  constructor(
    private readonly classes: ClassesService,
    private readonly students: StudentsService,
    private readonly activity: ActivityService,
  ) {}

  @Post('students/:studentId/classes')
  async create(
    @Param('studentId') studentId: string,
    @Body() dto: ClassDto,
    @Req() req: Request,
  ) {
    const name = await this.students.requireName(studentId);
    const cls = await this.classes.create(studentId, dto);
    this.activity.log(req.user as Actor, {
      action: 'create',
      entity: 'class',
      entityId: cls.id,
      summary: `Registró la clase «${cls.title}» de ${name}`,
    });
    return cls;
  }

  @Patch('classes/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: ClassDto,
    @Req() req: Request,
  ) {
    const cls = await this.classes.update(id, dto);
    this.activity.log(req.user as Actor, {
      action: 'update',
      entity: 'class',
      entityId: cls.id,
      summary: `Actualizó la clase «${cls.title}»`,
    });
    return cls;
  }

  @Delete('classes/:id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Req() req: Request) {
    await this.classes.remove(id);
    this.activity.log(req.user as Actor, {
      action: 'delete',
      entity: 'class',
      entityId: id,
      summary: 'Eliminó una clase',
    });
  }
}
