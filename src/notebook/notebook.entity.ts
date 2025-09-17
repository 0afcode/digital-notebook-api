import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { Section } from 'src/section/section.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notebook extends AuditBaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 300 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user: User) => user.notebooks)
  @JoinColumn()
  user: User;

  @OneToMany(() => Section, (sct) => sct.notebook, { lazy: true })
  sections: Section[];
}
