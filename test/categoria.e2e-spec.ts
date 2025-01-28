import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes do Modulo Categoria (e2e)', () => {
  let categoriaId: any;
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

  it('04 - Deve Listar Todas As Categorias', async () => {
    return request(app.getHttpServer())
      .get('/categorias')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });

  it('05 - Deve Listar apenas Por ID', async () => {
    return request(app.getHttpServer())
      .get(`/categorias/${categoriaId}`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });

  it('06 - Deve Listar por descricao', async () => {
    return request(app.getHttpServer())
      .get('/categorias/descricao/Remedio')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });

  it('07 - Deve Atualizar uma categoria', async () => {
    return request(app.getHttpServer())
      .put('/categorias')
      .set('Authorization', `${token}`)
      .send({
        id: categoriaId,
        nome: 'Remedio dois',
        descricao: 'Cartela',
      })
      .expect(200)
      .then((resposta) => {
        expect('Remedio dois').toEqual(resposta.body.nome);
      });
  });

  it('08 - Deve Deletar uma Categoria', async () => {
    return request(app.getHttpServer())
      .delete(`/categorias/deletar/${categoriaId}`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(204);
  });
});
