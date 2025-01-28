import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes do Modulo Produto (e2e)', () => {
  let categoriaId: any;
  let produtoId: any;
  let app: INestApplication;
  let token: any;
  let usuarioId: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve Cadastrar um novo Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .set('Authorization', `${token}`)
      .send({
        nome: 'adm',
        usuario: 'adm@adm.com',
        senha: 'adm12345',
        foto: 'teste',
        data_nascimento: '12/10/2006',
      })
      .expect(201);

    usuarioId = resposta.body.id;
  });

  it('02 - Deve Autenticar o Usuário (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'adm@adm.com',
        senha: 'adm12345',
      })
      .expect(200);

    token = resposta.body.token;
  });

  it('03 - Deve Cadastrar uma nova Categoria', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/categorias/cadastrar')
      .set('Authorization', `${token}`)
      .send({
        nome: 'Remedio',
        descricao: 'descricao remedio',
      })
      .expect(201);

    categoriaId = resposta.body.id;
  });
  it('04 - Deve Cadastrar uma nova Categoria', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/categorias/cadastrar')
      .set('Authorization', `${token}`)
      .send({
        nome: 'Remedio',
        descricao: 'descricao remedio',
      })
      .expect(201);

    categoriaId = resposta.body.id;
  });

  it('05 - Deve Cadastrar Um Novo Produto', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/produtos/cadastrar')
      .set('Authorization', `${token}`)
      .send({
        nome: 'Cinegrip',
        descricao: 'Para gripe',
        preco: 12.0,
        foto: '-',
        categoria: categoriaId,
      })
      .expect(201);

    produtoId = resposta.body.id;
  });

  it('06 - Deve listar Pelo id', async () => {
    await request(app.getHttpServer())
      .get(`/produtos/${produtoId}`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });

  it('07 - Deve Listar todos os Produtos', async () => {
    return request(app.getHttpServer())
      .get('/produtos/')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });

  it('08 - Deve Atualizar um Usuário', async () => {
    return request(app.getHttpServer())
      .put('/produtos/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: produtoId,
        nome: 'Cinegrip2',
        descricao: 'Teste atualizar',
        preco: 12.0,
        foto: '-',
        categoria: {
          id: 1,
        },
      })
      .expect(200)
      .then((resposta) => {
        expect('Cinegrip2').toEqual(resposta.body.nome);
      });
  });

  it('09 - Deve Deletar um Produto', async () => {
    return request(app.getHttpServer())
      .delete(`/produtos/deletar/${produtoId}`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(204);
  });

  it('10 - Deve Exibir por filtro de preço maior', async () => {
    return request(app.getHttpServer())
      .get(`/produtos/precoMaior/1`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });

  it('11 - Deve Exibir por filtro de menor', async () => {
    return request(app.getHttpServer())
      .get(`/produtos/precoMenor/1000`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });
});
