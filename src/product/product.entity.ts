import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Laptop', description: 'Name of the product' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'High-end laptop',
    description: 'Description of the product',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 1999.99,
    description: 'Price of the product',
    type: Number,
  })
  @Column('decimal')
  price: number;

  @ApiProperty({
    example: 'user-uuid-12345',
    description: 'UUID of the user owning the product',
  })
  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
