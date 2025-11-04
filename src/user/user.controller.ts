import {
  Controller,
  Post,
  Put,
  Request,
  Get,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { User } from './user.interface';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: any): User {
    const userId = req.user.userId;
    const user = this.userService.getProfile(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profiles')
  getAllProfiles(): User[] {
    return this.userService.getAllProfiles();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('onboarding-status')
  getOnboardingStatus(@Request() req: any): { completed: boolean } {
    const completed = this.userService.getOnboardingStatus(req.user.userId);
    return { completed };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  updateProfile(@Request() req: any, @Body() updates: UpdateProfileDto): User {
    const user = this.userService.updateProfile(req.user.userId, updates);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
