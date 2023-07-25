import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, throwError } from 'rxjs';
import { OnlyPermissionOrRole } from '../auth/modifiers';
import { PermissionDeniedException } from './Exceptions/PermissionDeniedException';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly permission?: string | string[],
    private readonly roles?: string | string[],
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // TODO: check active

    if (this.permission && this.permission.length > 0)
      if (!OnlyPermissionOrRole(user, this.permission)) {
        return throwError(
          () =>
            new PermissionDeniedException(
              'You dont have permission to access to this resource !!',
            ),
        );
      }
    if (this.roles && this.roles.length > 0) {
      if (!OnlyPermissionOrRole(user, this.roles)) {
        return throwError(
          () =>
            new PermissionDeniedException(
              'You are not allow to access to this resource !!',
            ),
        );
      }
    }
    console.log('user valid !!', user);
    return next.handle().pipe(map((data) => data));
  }
}
