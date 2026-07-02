import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Request, Response } from 'express';
import { StudentAuthService } from './student-auth.service';
import { StudentJwtGuard } from './guards/student-jwt.guard';
import { ChangePasswordDto, StudentLoginDto } from './dto';
import { STUDENT_ACCESS_COOKIE } from './types';

@Controller('portal/auth')
export class StudentAuthController {
  constructor(
    private readonly auth: StudentAuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: StudentLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const student = await this.auth.validate(dto.username, dto.password);
    const token = await this.auth.issueToken(student);
    res.cookie(STUDENT_ACCESS_COOKIE, token, {
      ...this.cookieBase(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { student };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(STUDENT_ACCESS_COOKIE, this.cookieBase());
    return { ok: true };
  }

  @Get('me')
  @UseGuards(StudentJwtGuard)
  async me(@Req() req: Request) {
    const { id } = req.user as { id: string };
    return { student: await this.auth.getProfile(id) };
  }

  @Post('change-password')
  @HttpCode(200)
  @UseGuards(StudentJwtGuard)
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request) {
    const { id } = req.user as { id: string };
    await this.auth.changePassword(id, dto.currentPassword, dto.newPassword);
    return { ok: true };
  }

  private cookieBase(): CookieOptions {
    const domain = this.config.get<string>('COOKIE_DOMAIN') || undefined;
    const isProd = this.config.get<string>('NODE_ENV') === 'production';
    return {
      httpOnly: true,
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
      domain,
      path: '/',
    };
  }
}
