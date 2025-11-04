import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [UserModule, AuthModule, LessonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
