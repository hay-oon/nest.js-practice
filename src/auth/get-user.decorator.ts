import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// 커스텀 데코레이터 생성 : req.user 추출 (password 제외)
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Omit<User, 'password'> => {
    const req = ctx.switchToHttp().getRequest();
    const { password, ...userWithoutPassword } = req.user;
    return userWithoutPassword;
  },
);
