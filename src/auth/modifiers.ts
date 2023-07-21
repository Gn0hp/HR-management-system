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

export function OnlyPermissionOrRole(user, accessLimit) {
  if (!user || !accessLimit || !user.permissions) return false;
  accessLimit.forEach((limit) => {
    if (!user.permissions.includes(limit)) {
      return false;
    }
  });
  return true;
}
