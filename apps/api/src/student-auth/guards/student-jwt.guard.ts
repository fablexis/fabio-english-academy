import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Guards portal (`/portal/*`) routes — requires a valid student JWT cookie. */
@Injectable()
export class StudentJwtGuard extends AuthGuard('student-jwt') {}
