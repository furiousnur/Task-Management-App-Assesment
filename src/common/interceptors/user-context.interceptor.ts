import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContextService } from '../services/context.service';

@Injectable({ scope: Scope.REQUEST })
export class UserContextInterceptor implements NestInterceptor {
  constructor(private readonly contextService: ContextService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      this.contextService.setUser(request.user);
    } else {
      console.log('No user found in request');
    }

    return next.handle();
  }
}
