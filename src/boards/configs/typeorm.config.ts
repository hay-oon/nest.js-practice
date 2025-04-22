import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'hayoon',
  password: 'hayoon',
  database: 'nest-practice',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
