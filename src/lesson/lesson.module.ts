import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonsService } from './lesson.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [LessonController],
  providers: [LessonsService, UserService],
  exports: [LessonsService],
})
export class LessonModule {}
