import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DbTestService } from './dbtest.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { NotebookModule } from './notebook/notebook.module';
import { SectionModule } from './section/section.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        // Priority order: most specific to least specific
        `src/env/.env.${process.env.NODE_ENV}.local`,
        `src/env/.env.${process.env.NODE_ENV}`,
        'src/env/.env.local',
        'src/env/.env',
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mysql',
          host: configService.get('MARIADB_HOST'),
          port: configService.get<number>('MARIADB_PORT'),
          username: configService.get('MARIADB_USER'),
          password: configService.get('MARIADB_PASS'),
          database: configService.get('MARIADB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/*.js'],
          synchronize: configService.get<boolean>('DB_SYNC') || false,
        }) as DataSourceOptions,
    }),
    UserModule,
    NotebookModule,
    SectionModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbTestService],
})
export class AppModule {}
