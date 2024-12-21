import { Base } from 'src/universal/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends Base {
  // @PrimaryGeneratedColumn({ type: 'bigint' })
  // id: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  contact: string;
}
