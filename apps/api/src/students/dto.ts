import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import type { CEFRLevel, Material, NoteBlock } from '@eyb/shared';

// Redefined locally — value imports from the ESM-only shared package are avoided
// in the API (same pattern as blog VARIANTS / PAGE_KEYS).
const LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

export class CreateStudentDto {
  @IsString() @MinLength(1) name!: string;

  @IsString()
  @Matches(/^[a-z0-9._-]+$/, {
    message: 'El usuario solo puede tener minúsculas, números y . _ -',
  })
  username!: string;

  @IsIn(LEVELS) level!: CEFRLevel;

  @IsString() @MinLength(4) password!: string;
}

export class UpdateStudentDto {
  @IsOptional() @IsString() @MinLength(1) name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9._-]+$/)
  username?: string;

  @IsOptional() @IsIn(LEVELS) level?: CEFRLevel;
  @IsOptional() @IsInt() @Min(0) streakWeeks?: number;
}

export class ClassDto {
  // Accepts YYYY-MM-DD (or any Date-parseable string); coerced in the service.
  @IsString() @MinLength(1) date!: string;
  @IsString() @MinLength(1) title!: string;
  @IsArray() @IsString({ each: true }) topics!: string[];
  // Structurally sanitized in the service (union shape).
  @IsArray() notes!: NoteBlock[];
  @IsArray() materials!: Material[];
  @IsOptional() @IsString() summary?: string;
}
