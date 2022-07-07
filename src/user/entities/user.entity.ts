import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { MoneyBook } from 'src/moneyBook/entities/moneyBook.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ApiProperty()
  @Column({ nullable: true })
  @Exclude()
  hashedRefreshToken?: 'string';

  // moneyBook과 1:N 관계 형성
  // @OnetoMany(() =>  )
  @OneToMany(() => MoneyBook, (moneyBook) => moneyBook.user)
  moneyBook: MoneyBook[];
}
