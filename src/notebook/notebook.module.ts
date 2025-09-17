import { Module } from '@nestjs/common';
import { NotebookController } from './notebook.controller';

@Module({
  imports: [],
  exports: [],
  controllers: [NotebookController],
})
export class NotebookModule {}
