import { User } from 'src/user/user.entity';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ObjectLiteral,
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

  public static updateAuditFields<T extends AuditBaseEntity | ObjectLiteral>(
    data: T,
    operation: 'create' | 'update' | 'delete',
    user: User,
  ) {
    const userId = user?.id || 'SYSTEM';
    if (operation === 'update') {
      data.modifiedBy = userId;
    }

    if (operation === 'create') {
      data.createdBy = userId;
    }

    if (operation === 'delete') {
      data.deletedBy = userId;
      data.deletedDate = new Date().toISOString();
    }
  }
}
