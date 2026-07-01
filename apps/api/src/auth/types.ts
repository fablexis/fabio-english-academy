export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export const ACCESS_COOKIE = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';
