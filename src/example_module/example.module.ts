import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module ({
    imports: [TypeOrmModule.forFeature([])], // Inserir o nome da classe Entidade (Model) do módulo
    providers: [], // Registrar as classes de Serviço
    controllers: [], // Registrar as classes Controladoras
    exports: [], // Adicionar as classes que precisam ser disponibilizadas para outros módulos
})
export class ExampleModule {}