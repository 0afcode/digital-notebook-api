import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appusers')
export class User {
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
}
