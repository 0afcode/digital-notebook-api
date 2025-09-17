import { Injectable } from '@nestjs/common';
import { Notebook } from './notebook.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Like, Repository, UpdateResult } from 'typeorm';
import { CreateNotebookDTO } from './dto/create-notebook.dto';
import { SearchNotebookDTO } from './dto/search-notebook.dto';
import { Override } from 'src/common/Override';
import { UpdateNotebookDTO } from './dto/update-notebook.dto';

type PartiallySearcheable = Override<
  SearchNotebookDTO,
  { name: FindOperator<string>; description: FindOperator<string> }
>;

@Injectable()
export class NotebookProvider {
  constructor(
    @InjectRepository(Notebook)
    private readonly notebookRepository: Repository<Notebook>,
  ) {}

  async create(data: CreateNotebookDTO): Promise<Notebook> {
    const newNb = this.notebookRepository.create(data);
    return this.notebookRepository.save(newNb);
  }

  async update(
    id: string,
    data: UpdateNotebookDTO,
  ): Promise<UpdateResult | null> {
    const notebookExists = await this.findById(id);
    if (notebookExists) {
      return this.notebookRepository.update(id, data);
    }
    return null;
  }

  async findById(id: string): Promise<Notebook | null> {
    return this.notebookRepository.findOneBy({ id });
  }

  async find(searchParams: SearchNotebookDTO): Promise<Notebook[]> {
    const where: Partial<PartiallySearcheable> = {};
    if (searchParams.id) where.id = searchParams.id;
    if (searchParams.userId) where.userId = searchParams.userId;
    if (searchParams.createdBy) where.createdBy = searchParams.createdBy;
    if (searchParams.modifiedBy) where.modifiedBy = searchParams.modifiedBy;
    if (searchParams.deletedBy) where.deletedBy = searchParams.deletedBy;

    // apply LIKE for strings
    if (searchParams.name) where.name = Like(`%${searchParams.name}%`);
    if (searchParams.description)
      where.description = Like(`%${searchParams.description}%`);
    return this.notebookRepository.find({ where });
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.update(id, {
        deletedDate: new Date().toISOString(),
        deletedBy: 'SYSTEM',
      });
      if (!result) return false;
      await this.notebookRepository.delete(id);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return false;
    }
  }
}
