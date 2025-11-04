import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter: number = 1;

  register(name: string, email: string, password: string): User {
    if (this.findByEmail(email)) {
      throw new ConflictException('Email already in use');
    }
    const user: User = {
      id: this.idCounter++,
      name,
      email,
      password,
    };
    this.users.push(user);
    return user;
  }

  getAllProfiles(): User[] {
    return this.users;
  }

  getProfile(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  updateProfile(id: number, updates: Partial<User>): User | undefined {
    const user = this.getProfile(id);
    if (user) {
      Object.assign(user, updates);
    }
    return user;
  }

  getOnboardingStatus(id: number): boolean {
    const user = this.getProfile(id);
    return !!(user && user.intention);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  markLessonCompleted(userId: number, lessonId: number): boolean {
    const user = this.getProfile(userId);
    if (!user) return false;
    if (!user.completedLessons) {
      user.completedLessons = [];
    }
    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId);
      return true;
    }
    return false;
  }

  getCompletedLessons(userId: number): number[] {
    const user = this.getProfile(userId);
    return user?.completedLessons || [];
  }
}
