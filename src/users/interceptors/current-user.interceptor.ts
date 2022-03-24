import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor ( private usersService: UsersService ) {}

  async intercept(context: ExecutionContext, currenUserHandler: CallHandler<any>): Promise<any> {
    // intercep the request and get the user
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if(userId ) {
      const user = await this.usersService.findOneUser(userId);
      // Assign user founf to  request object so the decorator can access it
      request.currentUser = user;
    }

    return currenUserHandler.handle();

  }
}