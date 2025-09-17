import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class AuditBaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdDate: string;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  modifiedDate?: string;

  @DeleteDateColumn({ nullable: true, type: 'timestamp' })
  deletedDate?: string;

  @Column()
  createdBy: string;

  @Column({ nullable: true })
  modifiedBy?: string;

  @Column({ nullable: true })
  deletedBy?: string;
}
