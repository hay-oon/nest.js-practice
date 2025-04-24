import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  /**
   * 보호된 테스트 라우트 - 인증된 사용자만 접근 가능
   *
   * @UseGuards(AuthGuard()) 작동방식:
   * 1. 요청 헤더에서 JWT 토큰을 추출
   * 2. jwt.strategy.ts의 검증 로직을 통해 토큰 유효성 검사
   * 3. 유효한 토큰이면 사용자 정보를 req.user에 저장하고 핸들러 실행
   * 4. 유효하지 않으면 401 Unauthorized 응답 반환
   */
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUser() user: User) {
    console.log(req);
    console.log(user); // 커스텀 데코레이터로 추출한 유저 정보, req.user 와 같음
  }
}
