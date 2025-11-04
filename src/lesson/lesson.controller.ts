import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { LessonsService } from './lesson.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('lessons')
export class LessonController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllLessons(@Request() req: any) {
    const userId = req.user.userId;
    const completed = this.userService.getCompletedLessons(userId);
    // Optionally, add locked/unlocked/completed status to each lesson here
    return this.lessonsService.getAllLessons().map((lesson) => ({
      ...lesson,
      completed: completed.includes(lesson.id),
      // Add locked logic if needed
    }));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/complete')
  completeLesson(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.userId;
    const success = this.userService.markLessonCompleted(userId, Number(id));
    return { success };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('progress')
  getLessonProgress(@Request() req: any) {
    const userId = req.user.userId;
    const allLessons = this.lessonsService.getAllLessons();
    const completed = this.userService.getCompletedLessons(userId);

    const completedLessons = allLessons.filter((lesson) =>
      completed.includes(lesson.id),
    );
    const nextLesson = allLessons.find(
      (lesson) => !completed.includes(lesson.id),
    );
    const currentWeek = nextLesson
      ? nextLesson.week
      : allLessons.length > 0
        ? allLessons[allLessons.length - 1].week
        : 0;

    return {
      totalLessons: allLessons.length,
      completedLessons: completedLessons.length,
      currentWeek,
      nextLesson: nextLesson || null,
    };
  }
}
