import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;

  // Empty string clears the picture.
  @IsOptional()
  @IsString()
  @MaxLength(500)
  avatarUrl?: string;
}
