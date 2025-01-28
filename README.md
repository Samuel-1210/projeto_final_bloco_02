# Projeto Final - Bloco 02: Farmácia

Este é o projeto final do bloco 02 do bootcamp da Generation Brasil. O projeto simula o sistema de gerenciamento de uma farmácia, com duas tabelas principais: **Produtos** e **Categorias**.

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações escaláveis e robustas em Node.js.
- **Node.js**: Plataforma para execução de código JavaScript no servidor.
- **Swagger**: Ferramenta para documentação e teste de APIs RESTful.
- **Jest**: Framework para criação de testes unitários e de integração.
- **MySQL**: Banco de dados relacional utilizado para armazenar os dados da aplicação.

---

## 📂 Estrutura do Projeto

### 1. **Entidades**

- **Produto**: Representa os produtos disponíveis na farmácia.
  - Atributos: `id`, `nome`, `descricao`, `preco`, `foto`, `categoria`.
  - Relacionamento: Muitos-para-um com a entidade **Categoria**.

- **Categoria**: Representa as categorias dos produtos (ex.: Medicamentos, Cosméticos).
  - Atributos: `id`, `nome`, `descricao`.
  - Relacionamento: Um-para-muitos com a entidade **Produto**.

### 2. **Principais Funcionalidades**

- **CRUD de Produtos:**
  - Criar, visualizar, atualizar e deletar produtos.
  - Relacionar produtos às categorias.

- **CRUD de Categorias:**
  - Criar, visualizar, atualizar e deletar categorias.

- **Documentação da API com Swagger:**
  - Endpoints documentados e prontos para testes interativos.

- **Validações:**
  - Dados obrigatórios são validados antes de salvar no banco.

### 3. **Testes**

- Testes unitários e de integração desenvolvidos com **Jest**.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **MySQL** (banco de dados configurado)
- **Nest CLI** (instalado globalmente)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Samuel-1210/projeto_final_bloco_02
   cd projeto_final_bloco_02
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   ```Criar o banco de dados: db_farmacia
   host: localhost
   port: 3306
   username: 'root',
   password: 'root'
4. **Inicie o servidor:**
   ```bash
   npm run start:dev
   ```

5. **Acesse a documentação no Swagger:**
   - URL: [http://localhost:4000/swagger](http://localhost:4000/swagger)

6. **Execute os testes:**
   ```bash
   npm run test:e2e
   ```

---






