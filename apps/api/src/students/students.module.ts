import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { ClassesController } from './classes.controller';
import { StudentsService } from './students.service';
import { ClassesService } from './classes.service';

@Module({
  controllers: [StudentsController, ClassesController],
  providers: [StudentsService, ClassesService],
  exports: [StudentsService, ClassesService],
})
export class StudentsModule {}
