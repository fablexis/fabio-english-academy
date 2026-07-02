import { IsString, MinLength } from 'class-validator';

export class StudentLoginDto {
  @IsString() @MinLength(1) username!: string;
  @IsString() @MinLength(1) password!: string;
}

export class ChangePasswordDto {
  @IsString() @MinLength(1) currentPassword!: string;
  @IsString() @MinLength(6) newPassword!: string;
}
