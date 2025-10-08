import { Module } from '@nestjs/common';
import { SectionProvider } from './section.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  providers: [SectionProvider],
  exports: [SectionProvider],
})
export class SectionModule {}
