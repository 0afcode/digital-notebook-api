import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { Notebook } from 'src/notebook/notebook.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Section extends AuditBaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  tags: string[];

  @ManyToOne(() => Notebook, (ntb: Notebook) => ntb.sections)
  @JoinColumn({ name: 'notebookId' })
  notebook: Notebook;
}
