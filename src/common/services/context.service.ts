import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private user: any;

  setUser(user: any) {
    this.user = {
      userId: user.userId || user.sub || user.id,
      username: user.username,
    };
  }

  getUser() {
    return this.user;
  }

  getUsername() {
    return this.user?.username;
  }
}
