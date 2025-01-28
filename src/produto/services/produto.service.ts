import { Categoria } from './../../categoria/entities/categoria.entity';
import { CategoriaService } from './../../categoria/services/categoria.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from '../entities/produto.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    let produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });
    if (!produto)
      throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);
    return produto;
  }

  async findByPrecoMaior(preco: number): Promise<Produto[]> {
    return this.produtoRepository
      .createQueryBuilder('produto')
      .where('produto.preco > :preco', { preco })
      .orderBy('produto.preco', 'ASC')
      .getMany();
  }

  async findByPrecoMenor(preco: number): Promise<Produto[]> {
    return this.produtoRepository
      .createQueryBuilder('produto')
      .innerJoinAndSelect('produto.categoria', 'categoria')
      .where('produto.preco < :preco', { preco })
      .orderBy('produto.preco', 'DESC')
      .getMany();
  }

  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
