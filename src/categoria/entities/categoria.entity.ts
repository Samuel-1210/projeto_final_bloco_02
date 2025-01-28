import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  descricao: string;

  @CreateDateColumn()
  data_criacao: Date;

  @UpdateDateColumn()
  data_atualizacao: Date;

  @ApiProperty({ type: () => Categoria })
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto[];
}
