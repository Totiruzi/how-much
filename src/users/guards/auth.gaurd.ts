import { CanActivate, ExecutionContext } from "@nestjs/common";

export class CurrentUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return !!request.session.userId;
    // return !!request.currentUser;
  }
}