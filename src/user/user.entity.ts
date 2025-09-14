import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { Notebook } from 'src/notebook/notebook.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appusers')
export class User extends AuditBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 150 })
  firstName: string;

  @Column({ nullable: false, length: 150 })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true, default: false })
  isActive: boolean;

  @OneToMany(() => Notebook, (ntb) => ntb.user, { cascade: true })
  notebooks: Notebook[];
}
