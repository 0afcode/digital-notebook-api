import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { Notebook } from 'src/notebook/notebook.entity';
import { Page } from 'src/page/page.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Section extends AuditBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'New Section',
  })
  name: string;

  @Column()
  notebookId: string;

  @ManyToOne(() => Notebook, (ntb: Notebook) => ntb.sections)
  @JoinColumn({ name: 'notebookId' })
  notebook: Notebook;

  @OneToMany(() => Page, (page: Page) => page.sectionId)
  pages: Page[];
}
