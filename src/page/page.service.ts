import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { Repository } from 'typeorm';
import CreatePageDTO from './dto/create-page.dto';
import SearchPageDTO from './dto/search-page.dto';
import { BaseSearchDTO } from 'src/common/BaseSearchDTO.abstract';
import UpdatePageDTO from './dto/update-page.dto';
import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { User } from 'src/user/user.entity';

@Injectable()
export class PageProvider {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async create(newPage: CreatePageDTO, user: User): Promise<Page> {
    const nP = this.pageRepository.create(newPage);
    AuditBaseEntity.updateAuditFields(nP, 'create', user);
    const res = await this.pageRepository.save(nP);
    return res;
  }

  async find(searchParams: SearchPageDTO): Promise<Page[]> {
    if (searchParams.id) {
      const res = await this.pageRepository.findOneBy({ id: searchParams.id });
      return res ? [res] : [];
    }

    const query = this.pageRepository.createQueryBuilder('page');
    if (searchParams.sectionId) {
      query.andWhere('page.sectionId = :id', { id: searchParams.sectionId });
    }

    if (searchParams.content) {
      query.andWhere(`LOWER(page.content) LIKE '%:content%'`, {
        content: searchParams.content.trim().toLowerCase(),
      });
    }

    if (searchParams.tags) {
      // ensure the tags are in array format
      let tags: string[];
      if (!Array.isArray(searchParams.tags)) {
        tags = [searchParams.tags.toLowerCase()];
      } else {
        tags = searchParams.tags.map((t: string) => t.trim().toLowerCase());
      }
      query.andWhere(`page.tags && :tags`, { tags });
    }

    BaseSearchDTO.applyAuditFilters(query, searchParams, 'page');

    const res = await query.getMany();
    return res;
  }

  async update(
    id: string,
    data: UpdatePageDTO,
    user: User,
  ): Promise<string | null> {
    try {
      const res = await this.find({ id });
      if (res?.[0]) {
        // do update here
        const newObj = { ...data };
        AuditBaseEntity.updateAuditFields(newObj, 'update', user);
        const didUpdate = await this.pageRepository.update(id, newObj);
        if (didUpdate.affected) {
          return id;
        }
      }
      return null;
    } catch (_error) {
      return null;
    }
  }

  async delete(id: string, user: User): Promise<boolean> {
    try {
      const res = await this.find({ id });
      if (res?.[0]) {
        const newObj = {};
        AuditBaseEntity.updateAuditFields(newObj, 'delete', user);
        const didUpdate = await this.pageRepository.update(id, newObj);
        return !!didUpdate?.affected;
      }
      return false;
    } catch (_err) {
      return false;
    }
  }
}
