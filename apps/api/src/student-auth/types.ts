/**
 * Portal (student) principal. Separate from the admin `access_token` cookie:
 * a student JWT lives in `student_access_token` and carries `typ: 'student'`.
 * We reuse JWT_ACCESS_SECRET but the cookie name + `typ` claim keep the two
 * principals fully disjoint (the admin strategy only reads `access_token`).
 */
export interface StudentJwtPayload {
  sub: string;
  username: string;
  typ: 'student';
}

export const STUDENT_ACCESS_COOKIE = 'student_access_token';
