import { Injectable } from '@nestjs/common';
import { Notebook } from './notebook.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateNotebookDTO } from './dto/create-notebook.dto';
import { SearchNotebookDTO } from './dto/search-notebook.dto';
import { UpdateNotebookDTO } from './dto/update-notebook.dto';
import { BaseSearchDTO } from 'src/common/BaseSearchDTO.abstract';
import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { User } from 'src/user/user.entity';

@Injectable()
export class NotebookProvider {
  constructor(
    @InjectRepository(Notebook)
    private readonly notebookRepository: Repository<Notebook>,
  ) {}

  async create(data: CreateNotebookDTO, user: User): Promise<Notebook> {
    const newNb = this.notebookRepository.create(data);
    AuditBaseEntity.updateAuditFields(newNb, 'create', user);
    return this.notebookRepository.save(newNb);
  }

  async update(
    id: string,
    data: UpdateNotebookDTO,
    user: User,
  ): Promise<UpdateResult | null> {
    const notebookExists = await this.findById(id);
    if (notebookExists) {
      if (data.description) notebookExists.description = data.description;
      if (data.name) notebookExists.name = data.name;
      if (data.userId) notebookExists.userId = data.userId;
      AuditBaseEntity.updateAuditFields(notebookExists, 'update', user);
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

  async delete(id: string, user: User): Promise<boolean> {
    try {
      const data = await this.findById(id);
      if (!data) return false;
      AuditBaseEntity.updateAuditFields(data, 'delete', user);
      const res = await this.update(id, data, user);
      return !!res;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
