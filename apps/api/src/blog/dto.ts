import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import type { BlogBody, BlogVariant } from '@eyb/shared';

const VARIANTS: BlogVariant[] = ['teal', 'lime', 'dark', 'plain'];

export class CreateBlogPostDto {
  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'slug must be kebab-case' })
  slug!: string;

  @IsString() @MinLength(1) category!: string;
  @IsString() @MinLength(1) title!: string;
  @IsString() @MinLength(1) excerpt!: string;
  @IsString() @MinLength(1) readTime!: string;
  @IsString() @MinLength(1) level!: string;

  @IsIn(VARIANTS)
  variant!: BlogVariant;

  @IsString() @MinLength(1) image!: string;

  // Rich nested structure — validated as an object here and re-validated by the
  // shared Zod-equivalent shape at the boundary. Stored JSON-stringified.
  @IsObject()
  body!: BlogBody;

  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsInt() @Type(() => Number) sortOrder?: number;
}

export class UpdateBlogPostDto {
  @IsOptional() @IsString() @Matches(/^[a-z0-9-]+$/) slug?: string;
  @IsOptional() @IsString() @MinLength(1) category?: string;
  @IsOptional() @IsString() @MinLength(1) title?: string;
  @IsOptional() @IsString() @MinLength(1) excerpt?: string;
  @IsOptional() @IsString() @MinLength(1) readTime?: string;
  @IsOptional() @IsString() @MinLength(1) level?: string;
  @IsOptional() @IsIn(VARIANTS) variant?: BlogVariant;
  @IsOptional() @IsString() @MinLength(1) image?: string;
  @IsOptional() @IsObject() body?: BlogBody;
  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsInt() @Type(() => Number) sortOrder?: number;
}
