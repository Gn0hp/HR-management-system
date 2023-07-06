export interface JwtPayload {
  userId: number;
  roles: string[]; // ['admin', 'user']
}
