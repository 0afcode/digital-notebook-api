import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { PageProvider } from './page.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  exports: [PageProvider],
  providers: [PageProvider],
})
export class PageModule {}
