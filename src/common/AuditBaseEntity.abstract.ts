import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class AuditBaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedDate: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedDate?: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  modifiedBy?: string;

  @Column({ nullable: true })
  deletedBy?: string;
}
