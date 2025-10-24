# Desafio de Microsserviços NTT DATA - Catálogo de Produtos

Este repositório contém a implementação do Desafio Técnico de Microsserviços proposto pela [Digital Innovation One (DIO)](https://dio.me/) em parceria com a [NTT DATA](https://www.nttdata.com/).

O objetivo do projeto é desenvolver um sistema simples de gestão de pedidos com catálogo de produtos, utilizando uma arquitetura de microsserviços com o ecossistema Spring e containerização com Docker.

## 🚀 Conceitos Aplicados
Este projeto foi uma oportunidade para aplicar e aprofundar conhecimentos em conceitos fundamentais de arquiteturas distribuídas modernas, incluindo:
- **Arquitetura de Microsserviços:** Divisão do sistema em serviços menores, independentes e coesos.
- **Service Discovery:** Registro e descoberta automática dos serviços na rede utilizando Eureka Server.
- **API Gateway:** Implementação de um ponto de entrada único para a aplicação (`Spring Cloud Gateway`), responsável pelo roteamento e centralização da segurança.
- **Segurança de API:** Proteção de todos os endpoints com `Spring Security` e validação de `Bearer Token` através de um filtro global.
- **Comunicação entre Serviços:** Comunicação síncrona via requisições HTTP, facilitada pelo OpenFeign.
- **Documentação de API:** Geração e agregação de documentação de todos os microsserviços no Gateway com `SpringDoc-OpenAPI (Swagger)`.
- **Gestão de CORS:** Configuração de Cross-Origin Resource Sharing para permitir a comunicação entre o front-end (e o Swagger UI) e o back-end.
- **Containerização:** Empacotamento e orquestração de toda a aplicação com Docker e Docker Compose, garantindo portabilidade e um ambiente de desenvolvimento consistente.
- **Princípios de API REST:** Construção de endpoints seguindo as melhores práticas do modelo REST.
- **Arquitetura em Camadas:** Organização interna dos serviços seguindo o padrão Controller-Service-Repository.

## 🛠️ Tecnologias Utilizadas (Stack)
- **Linguagem:** Java 21
- **Framework Principal:** Spring Boot 3.3.2
- **Ecossistema Spring Cloud (2023.0.2):**
  - **Spring Cloud Gateway:** Ponto de entrada único da aplicação.
  - **Spring Cloud Netflix Eureka:** Para Service Discovery.
  - **Spring Cloud OpenFeign:** Para comunicação declarativa entre APIs REST.
- **Segurança:**
  - **Spring Boot Security:** Para a camada de segurança (filtro no Gateway, desativação de CSRF nos serviços).
- **Documentação:**
  - **SpringDoc-OpenAPI (Swagger):** Para documentação e agregação da API.
- **Persistência de Dados:**
  - Spring Data JPA
  - H2 Database (banco de dados em memória)
- **Build Tool:** Gradle
- **Containerização:**
  - Docker
  - Docker Compose

## 📊 Progresso Atual

Até o momento, a arquitetura de microsserviços foi **totalmente implementada** e está 100% funcional. Todos os serviços, incluindo o API Gateway e a camada de segurança extra, estão operacionais e orquestrados com o Docker Compose.

### Microsserviços Concluídos:

#### 1. `discovery-service` (Eureka Server)
- **Status:** ✅ Concluído e operacional.
- **Descrição:** Atua como o "catálogo telefônico" da nossa arquitetura. Todos os outros serviços se registram nele ao iniciar, permitindo que se encontrem dinamicamente na rede.

#### 2. `product-service` (Microsserviço de Catálogo de Produtos)
- **Status:** ✅ Concluído e operacional.
- **Descrição:** Responsável por gerenciar o CRUD de produtos. Segue uma arquitetura interna Controller-Service-Repository e utiliza Spring Data JPA com um banco H2 para persistência dos dados.

#### 3. `order-service` (Microsserviço de Simulação de Pedidos)
- **Status:** ✅ Concluído e operacional.
- **Descrição:** Responsável por simular a criação de um pedido. Este serviço demonstra a comunicação entre microsserviços, utilizando **OpenFeign** para chamar a API do `product-service`, buscar os produtos por ID e calcular o valor total do pedido.

#### 4. `api-gateway` (Gateway da Aplicação)
- **Status:** ✅ Concluído e operacional.
- **Descrição:** Atua como a porta de entrada única (porta `8765`). Roteia requisições para os serviços corretos, agrega a documentação Swagger e protege *todos* os endpoints com um filtro de segurança (`AuthenticationFilter`) que valida um `Bearer Token` estático.

### Orquestração com Docker
- **Status:** ✅ Concluído.
- **Descrição:** Todos os **quatro** serviços foram containerizados utilizando `Dockerfile`. Um arquivo `docker-compose.yml` foi configurado para orquestrar a inicialização, a rede e as dependências entre os contêineres, permitindo que toda a arquitetura seja iniciada com um único comando.

## 🎯 Próximos Passos
Com a arquitetura principal e a segurança base concluídas, o plano agora foca em profissionalizar a solução:

1.  **Refatoração da Segurança (JWT):**
    - Substituir o `Bearer Token` estático por um sistema de autenticação dinâmico baseado em **JWT (JSON Web Tokens)**.
    - Isso envolverá a criação de um `auth-service` (ou um endpoint em um serviço existente) para `login` e geração de tokens.

2.  **Implementação do Front-End:**
    - Criar a interface de usuário (React, Angular, Vue, etc.) que consumirá a API, agora segura, através do API Gateway.

## ⚙️ Como Executar o Projeto

**Pré-requisitos:**
- Git
- Docker e Docker Compose

**Passos:**
1.  Clone o repositório:
    ```bash
    git clone [https://github.com/MateusLima909/desafio-microsservicos/](https://github.com/MateusLima909/desafio-microsservicos/)
    ```
2.  Navegue para a pasta do projeto:
    ```bash
    cd desafio-microsservicos
    ```
3.  Execute o Docker Compose para construir as imagens e iniciar todos os contêineres:
    ```bash
    docker-compose up --build
    ```
    *(Use `-d` para executar em segundo plano)*

4.  **Verificação:**
    - **Painel do Eureka:** Acesse `http://localhost:8761` para ver os serviços `API-GATEWAY`, `PRODUCT-SERVICE` e `ORDER-SERVICE` registrados.
    - **Documentação da API (Swagger):** Acesse `http://localhost:8765/swagger-ui.html`. Este é o ponto de entrada principal para visualizar todas as APIs.

5.  **Testando a API (Importante!):**
    - Todas as requisições devem ser feitas através do **API Gateway** na porta `8765`. O acesso direto aos serviços (portas 8100, 8200) não funcionará.
    - Todos os endpoints (exceto o Swagger) exigem autenticação.
    - Use o **Postman** ou outra ferramenta de API (o "Execute" do Swagger UI pode falhar com `POST`/`PUT`/`DELETE` em alguns ambientes como o Codespaces devido a regras de CORS/Proxy).
    - **Token de Autenticação:** Adicione o seguinte *Header* em suas requisições:
      - **Key:** `Authorization`
      - **Value:** `Bearer meu-token-secreto`