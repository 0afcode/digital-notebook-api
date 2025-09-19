import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Page extends AuditBaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  tags: string[];

  @Column()
  content: string;
}
