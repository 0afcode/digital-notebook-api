import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Section } from './section.entity';
import { CreateSectionDTO } from './dto/create-section.dto';

@Injectable()
export class SectionProvider {
  constructor(private readonly sectionRepository: Repository<Section>) {}

  async create(data: CreateSectionDTO): Promise<Section> {
    const section = this.sectionRepository.create(data);

    return this.sectionRepository.save(section);
  }
}
