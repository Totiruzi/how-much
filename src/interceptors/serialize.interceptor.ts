import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// defining a class to be passed to the interceptor
interface SerializationInterceptorOptions {
  new (...args: any[]): {};
}

export function Serialize(dto: SerializationInterceptorOptions) {
  return UseInterceptors( new SerializationInterceptor(dto))
}

export class SerializationInterceptor implements NestInterceptor {
  constructor( private dto: any ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        })
      }),
    );
  }
}