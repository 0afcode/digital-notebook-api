import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  exports: [],
  providers: [],
})
export class PageModule {}
