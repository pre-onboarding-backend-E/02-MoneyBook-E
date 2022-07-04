import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity()
class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id?: number;

  @ApiProperty()
  @Column({ unique: true })
  public email: string;

  @ApiProperty()
  @Column()
  public password: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  // moneyBook과 1:N 관계 형성
  // @OnetoMany(() =>  )
}
