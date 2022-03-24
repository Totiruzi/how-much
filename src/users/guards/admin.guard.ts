import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGaurd implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.isAdmin;
  }
}