import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { Section } from 'src/section/section.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Page extends AuditBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'New Page',
  })
  title: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  tags?: string[];

  @Column()
  content: string;

  @Column()
  sectionId: string;

  @ManyToOne(() => Section, (sec: Section) => sec.pages)
  @JoinColumn({ name: 'sectionId' })
  section: Section;
}
