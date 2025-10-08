import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Section } from './section.entity';
// import { CreateSectionDTO } from './dto/create-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSectionDTO } from './dto/create-section.dto';
import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { User } from 'src/user/user.entity';
import { UpdateSectionDTO } from './dto/update-section.dto';
import { SectionSearchDTO } from './dto/search-section.dto';
import { BaseSearchDTO } from 'src/common/BaseSearchDTO.abstract';

@Injectable()
export class SectionProvider {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async create(data: CreateSectionDTO, user: User): Promise<Section> {
    const section = this.sectionRepository.create(data);
    AuditBaseEntity.updateAuditFields(section, 'create', user);
    return this.sectionRepository.save(section);
  }

  async update(
    id: string,
    data: UpdateSectionDTO,
    user: User,
  ): Promise<string | null> {
    try {
      const aSection = await this.sectionRepository.findOneBy({ id });
      if (!aSection) return null;
      const newObj = { ...data };
      AuditBaseEntity.updateAuditFields(newObj, 'update', user);
      await this.sectionRepository.update({ id }, newObj);
      return id;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async find(searchParams: SectionSearchDTO): Promise<Section[]> {
    if (searchParams.id) {
      const res = await this.sectionRepository.findOneBy({
        id: searchParams.id,
      });
      return res ? new Array<Section>(res) : new Array<Section>();
    }
    const queryBuilder = this.sectionRepository.createQueryBuilder('section');
    if (searchParams.name) {
      queryBuilder.andWhere(`LOWER(section.name) LIKE %:name%`, {
        name: searchParams.name.toLowerCase(),
      });
    }

    if (searchParams.notebookId) {
      queryBuilder.andWhere(`section.notebookId = :nid`, {
        nid: searchParams.notebookId,
      });
    }

    if (searchParams.sortDirection) {
      queryBuilder.addOrderBy(
        'section.name',
        searchParams.sortDirection || 'ASC',
      );
    }

    BaseSearchDTO.applyAuditFilters(queryBuilder, searchParams, 'section');

    return queryBuilder.getMany();
  }

  async delete(id: string, user: User): Promise<boolean> {
    const data = await this.find({ id });
    if (!data?.length) return false;
    AuditBaseEntity.updateAuditFields(data[0], 'delete', user);
    const res = await this.update(id, data[0], user);
    return !!res;
  }
}
