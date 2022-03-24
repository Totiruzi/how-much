import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

    // Assign user founf to  request object so the decorator can access it
  use(req: Request, res: Response, next: NextFunction) {
    // intercep the request and get the user seesion
    const { userId } = req.session || {};

    if (userId) {
      const user = this.usersService.findOneUser(userId);
      //@ts-ignore
      req.currentUser = user;
    }

    next();
  }
}