import { Module } from '@nestjs/common';
import { NotebookController } from './notebook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notebook } from './notebook.entity';
import { NotebookProvider } from './notebook.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Notebook])],
  exports: [NotebookProvider],
  providers: [NotebookProvider],
  controllers: [NotebookController],
})
export class NotebookModule {}
