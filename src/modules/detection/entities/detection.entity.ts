import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Detection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  objectName: string;

  @Column({ type: 'float' })
  confidence: number;

  @CreateDateColumn()
  detectedAt: Date;
}
