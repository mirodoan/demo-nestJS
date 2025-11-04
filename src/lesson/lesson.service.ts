import { Injectable, ConflictException } from '@nestjs/common';
import { Lesson } from './lesson.interface';

@Injectable()
export class LessonsService {
  // In-memory storage for lessons
  private lessons: Lesson[] = [
    {
      id: 1,
      title: 'Introduction to Wellbeing',
      week: 1,
      content: 'Lesson 1 content...',
    },
    {
      id: 2,
      title: 'Understanding Focus',
      week: 2,
      content: 'Lesson 2 content...',
    },
    {
      id: 3,
      title: 'Understanding Achievement',
      week: 3,
      content: 'Lesson 3 content...',
    },
  ];

  getAllLessons(): Lesson[] {
    return this.lessons;
  }

  getLessonById(id: number): Lesson | undefined {
    return this.lessons.find((lesson) => lesson.id === id);
  }

  getLessonsByWeek(week: number): Lesson[] {
    return this.lessons.filter((lesson) => lesson.week === week);
  }
}
