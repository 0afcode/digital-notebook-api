import { AuditBaseEntity } from 'src/common/AuditBaseEntity.abstract';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Page extends AuditBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  tags?: string[];

  @Column()
  content: string;
}
