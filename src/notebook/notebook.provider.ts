import { Injectable } from '@nestjs/common';
import { Notebook } from './notebook.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateNotebookDTO } from './dto/create-notebook.dto';
import { SearchNotebookDTO } from './dto/search-notebook.dto';
import { UpdateNotebookDTO } from './dto/update-notebook.dto';
import { BaseSearchDTO } from 'src/common/BaseSearchDTO.abstract';

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
    const queryBuilder = this.notebookRepository.createQueryBuilder('notebook');

    if (searchParams.id) {
      queryBuilder.andWhere('notebook.id = :id', { id: searchParams.id });
    }

    if (searchParams.name) {
      queryBuilder.andWhere('LOWER(notebook.name) LIKE :name', {
        name: `%${searchParams.name.toLocaleLowerCase()}%`,
      });
    }

    if (searchParams.description) {
      queryBuilder.andWhere('LOWER(notebook.description) LIKE :description', {
        description: `${searchParams.description.toLowerCase()}`,
      });
    }

    if (searchParams.userId) {
      queryBuilder.andWhere('notebook.userId = :userId', {
        userId: searchParams.userId,
      });
    }

    // audit field searches
    BaseSearchDTO.applyAuditFilters(queryBuilder, searchParams, 'notebook');

    return queryBuilder.getMany();
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
