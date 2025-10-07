import { User } from 'src/user/user.entity';
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

  public static upateAuditFields<T extends AuditBaseEntity>(
    data: T,
    operation: string,
    user: User,
  ) {
    if (operation === 'update') {
      data.modifiedBy = user.id || 'SYSTEM';
      data.modifiedDate = new Date().toISOString();
    }

    if (operation === 'create') {
      data.createdBy = user.id || 'SYSTEM';
      data.createdDate = new Date().toISOString();
    }

    if (operation === 'delete') {
      data.deletedBy = user.id || 'SYSTEM';
      data.deletedDate = new Date().toISOString();
    }
  }
}
