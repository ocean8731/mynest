import { Injectable } from '@nestjs/common';

// IOC 컨테이너에게 어떤 클래스를 사용할지 알려주는 역할
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
