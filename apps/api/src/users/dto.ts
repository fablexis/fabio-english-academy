import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class InviteUserDto {
  @IsEmail({}, { message: 'Introduce un email válido' })
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Introduce un email válido' })
  email?: string;
}
