import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  SetMetadata,
} from '@nestjs/common';
import { map, throwError } from 'rxjs';
import { ModiferType, OnlyPermissionOrRole } from '../../auth/modifiers';
import { PermissionDeniedException } from '../../commons/Exceptions/PermissionDeniedException';
import { UserService } from '../user-module/user-service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // const permissionAndRoles = this.reflector.get<{
    //   permissions: string | string[];
    //   roles: string | string[];
    // }>('permissions_and_roles', context.getHandler);
    // const { permissions, roles } = permissionAndRoles;
    user.permissions = await this.userService
      .getAllPermissionByUserId(user.userId)
      .then((data) => data.map((item) => item.name))
      .catch((err) => {
        console.log(err);
      });
    user.roles = await this.userService
      .getRolesByUserId(user.userId)
      .then((data) => data.map((item) => item.name))
      .catch((err) => {
        console.log(err);
      });
    const permissions = this.reflector.get('permissions', context.getHandler());
    const roles = this.reflector.get('roles', context.getHandler());
    if (permissions && permissions.length > 0)
      if (!OnlyPermissionOrRole(user, permissions, ModiferType.PERMISSIONS)) {
        return throwError(
          () =>
            new PermissionDeniedException(
              'You dont have permission to access to this resource !!',
            ),
        );
      }
    if (roles && roles.length > 0) {
      if (!OnlyPermissionOrRole(user, roles, ModiferType.ROLES)) {
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

export const RequiredPermission = (permissions?: string | string[]) =>
  SetMetadata('permissions', permissions);
export const RequiredRole = (roles?: string | string[]) =>
  SetMetadata('roles', roles);
