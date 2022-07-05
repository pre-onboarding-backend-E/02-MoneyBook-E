import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('moneybook')
export class MoneyBook {
  @PrimaryGeneratedColumn()
  id: number;

  // income or outcome
  @Column()
  money: number;

  // type ==1 이면 income 2면 outcome / 입력은 number로 나타낼 땐 string  (enum)
  @Column()
  type: string;

  // 총 합계
  @Column()
  total: number;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.moneyBook, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  user: User;
}
