import { createParamDecorator } from '@nestjs/common';

// export const OnlyPermission = (user, accessLimit) => {
//   if (user) {
//     if (user.permissions) {
//       if (user.permissions.includes(accessLimit)) {
//         return true;
//       }
//     }
//   }
//   return false;
// };
export enum ModiferType {
  PERMISSIONS = 'permissions',
  ROLES = 'roles',
}
export function OnlyPermissionOrRole(user, accessLimit, type: ModiferType) {
  if (typeof accessLimit === 'string') accessLimit = [accessLimit];
  if (!user || !accessLimit || !user[type]) return false;
  for (const limit of accessLimit) {
    if (!user[type].includes(limit)) return false;
  }
  return true;
}
