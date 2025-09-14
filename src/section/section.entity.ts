import { Notebook } from 'src/notebook/notebook.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: false, type: 'datetime' })
  createdDate: string;

  @Column()
  notebookId: string;

  @ManyToOne(() => Notebook, (ntb: Notebook) => ntb.sections)
  @JoinColumn({ name: 'notebookId' })
  notebook: Notebook;
}
