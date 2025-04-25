import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 환경변수 설정
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 타입ORM 설정
    TypeOrmModule.forRoot(typeORMConfig),
    // 모듈 설정
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
