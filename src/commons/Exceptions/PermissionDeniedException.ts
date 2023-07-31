import { HttpException } from '@nestjs/common';

export class PermissionDeniedException extends HttpException {
  constructor(message: string) {
    super(message, 403);
  }
}
