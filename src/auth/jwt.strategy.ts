import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UserRepository } from './user.repository';

/**
 * JWT 인증 전략 구현
 * @UseGuards(AuthGuard())와 함께 작동하여 보호된 라우트에 대한 인증 처리
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      // 요청의 Authorization 헤더에서 Bearer 토큰을 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWT 서명을 검증하는 데 사용되는 비밀 키
      secretOrKey: 'secret',
    });
  }

  /**
   * JWT가 유효할 때 Passport에 의해 호출되는 메소드
   * @param payload - 디코딩된 JWT 페이로드
   * @returns 인증된 사용자 객체 (req.user에 자동으로 할당됨)
   * @throws UnauthorizedException - 사용자가 존재하지 않을 경우
   */
  async validate(payload) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // 이 반환값이 @GetUser() 데코레이터에 의해 추출됨
  }
}
