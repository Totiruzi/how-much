import { CanActivate, ExecutionContext } from "@nestjs/common";

export class CurrentUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Make sure the user is logged in before allowing access to the route.
    return !!request.session.userId;
    // return !!request.currentUser;
  }
}