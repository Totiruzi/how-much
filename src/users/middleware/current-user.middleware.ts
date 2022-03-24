import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';

// to tell express to add user to req object
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

    // Assign user founf to  request object so the decorator can access it
  async use(req: Request, res: Response, next: NextFunction) {
    // intercep the request and get the user seesion
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOneUser(userId);
      req.currentUser = user;
    }

    next();
  }
}