import { ApiProperty } from '@nestjs/swagger';
import { classToPlain, Exclude } from 'class-transformer';
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

  @ApiProperty({ description: '이메일', example: 'test@mail.com' })
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ApiProperty({ description: '수정일' })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ApiProperty()
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  hashedRefreshToken!: 'string';

  // moneyBook과 1:N 관계 형성
  // @OnetoMany(() =>  )

  @OneToMany(() => MoneyBook, (moneyBook) => moneyBook.user, { nullable: true })
  moneyBooks: MoneyBook[];

  toJSON() {
    return classToPlain(this);
  }
}
