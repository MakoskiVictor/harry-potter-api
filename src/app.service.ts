import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object[] {
    return [
      {
        route: '/character',
        method: 'Get',
        explanation: 'Get list of characters',
      },
      {
        route: '/character',
        method: 'Post',
        explanation: 'Post a new character',
      },
      {
        route: '/character',
        method: 'Delete',
        explanation: 'Delete an especific character',
      },
    ];
  }
}
