import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { PageProvider } from './page.service';
import { PageController } from './page.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  exports: [PageProvider],
  providers: [PageProvider],
  controllers: [PageController],
})
export class PageModule {}
