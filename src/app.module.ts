import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriaModule,
    ProdutoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
