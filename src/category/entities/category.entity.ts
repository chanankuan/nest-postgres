import { Transaction } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
