import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DbTestService } from './dbtest.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['src/env/.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mysql',
          host: configService.get('MARIADB_HOST'),
          port: configService.get<Number>('MARIADB_PORT'),
          username: configService.get('MARIADB_USER'),
          password: configService.get('MARIADB_PASS'),
          database: configService.get('MARIADB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/*.js'],
          synchronize: configService.get<Boolean>('DB_SYNC') || false,
        }) as DataSourceOptions,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbTestService],
})
export class AppModule {}
