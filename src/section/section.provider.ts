import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Section } from './section.entity';
import { CreateSectionDTO } from './dto/create-section.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SectionProvider {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async create(data: CreateSectionDTO): Promise<Section> {
    const section = this.sectionRepository.create(data);
    return this.sectionRepository.save(section);
  }

  // async update(id: string, data: UpdateSectionDTO): Promise<Section> {

  // };

  // async find(searchParams: SearchSectionDTO): Promise<Section> {

  // };
}
