import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STUDENT_ACCESS_COOKIE, type StudentJwtPayload } from '../types';

/** Reads the student access JWT from its dedicated httpOnly cookie. */
function studentCookieExtractor(req: Request): string | null {
  const cookies = (req as Request & { cookies?: Record<string, string> }).cookies;
  return cookies?.[STUDENT_ACCESS_COOKIE] ?? null;
}

@Injectable()
export class StudentJwtStrategy extends PassportStrategy(Strategy, 'student-jwt') {
  constructor(config: ConfigService) {
    const secret = config.get<string>('JWT_ACCESS_SECRET');
    if (!secret) throw new UnauthorizedException('JWT_ACCESS_SECRET not configured');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([studentCookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: StudentJwtPayload) {
    // Reject admin tokens that somehow reach this strategy.
    if (payload.typ !== 'student') throw new UnauthorizedException();
    return { id: payload.sub, username: payload.username };
  }
}
