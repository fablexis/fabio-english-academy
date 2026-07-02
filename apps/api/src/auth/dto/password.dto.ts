import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Introduce un email válido' })
  email!: string;
}

export class SetPasswordDto {
  @IsString()
  @MinLength(20)
  token!: string;

  // Mirrors the live checklist in admin/pages/SetPassword.tsx.
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/[A-ZÁÉÍÓÚÑ]/, { message: 'La contraseña debe incluir una mayúscula' })
  @Matches(/[a-záéíóúñ]/, { message: 'La contraseña debe incluir una minúscula' })
  @Matches(/\d/, { message: 'La contraseña debe incluir un número' })
  password!: string;
}
