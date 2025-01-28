import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Produto')
@Controller('/produtos')
@ApiBearerAuth()

export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id') // Variavel
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }

  @Get('/precoMaior/:preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoMaior(
    @Param('preco', ParseIntPipe) preco: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByPrecoMaior(preco);
  }

  @Get('/precoMenor/:preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoMenor(
    @Param('preco', ParseIntPipe) preco: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByPrecoMenor(preco);
  }
}
