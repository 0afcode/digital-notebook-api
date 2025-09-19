import { Module } from '@nestjs/common';
import { SectionProvider } from './section.provider';

@Module({
  imports: [SectionProvider],
  exports: [SectionProvider],
})
export class SectionModule {}
