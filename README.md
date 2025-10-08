# Desafio de Microsserviços NTT DATA - Catálogo de Produtos

Este repositório contém a implementação do Desafio Técnico de Microsserviços proposto pela [Digital Innovation One (DIO)](https://dio.me/) em parceria com a [NTT DATA](https://www.nttdata.com/).

O objetivo do projeto é desenvolver um sistema simples de gestão de pedidos com catálogo de produtos, utilizando uma arquitetura de microsserviços com o ecossistema Spring e containerização com Docker.

## 🚀 Conceitos Aplicados
Este projeto foi uma oportunidade para aplicar e aprofundar conhecimentos em conceitos fundamentais de arquiteturas distribuídas modernas, incluindo:
-   **Arquitetura de Microsserviços:** Divisão do sistema em serviços menores, independentes e coesos.
-   **Service Discovery:** Registro e descoberta automática dos serviços na rede utilizando Eureka Server.
-   **Comunicação entre Serviços:** Comunicação síncrona via requisições HTTP, facilitada pelo OpenFeign.
-   **Containerização:** Empacotamento e orquestração de toda a aplicação com Docker e Docker Compose, garantindo portabilidade e um ambiente de desenvolvimento consistente.
-   **Princípios de API REST:** Construção de endpoints seguindo as melhores práticas do modelo REST.
-   **Arquitetura em Camadas:** Organização interna dos serviços seguindo o padrão Controller-Service-Repository.

## 🛠️ Tecnologias Utilizadas (Stack)
-   **Linguagem:** Java 21
-   **Framework Principal:** Spring Boot 3.3.2
-   **Ecossistema Spring Cloud (2023.0.2):**
    -   **Spring Cloud Netflix Eureka:** Para Service Discovery.
    -   **Spring Cloud OpenFeign:** Para comunicação declarativa entre APIs REST.
    -   **Spring Cloud Gateway:** (Próximo passo) Para ser o ponto de entrada único da aplicação.
-   **Persistência de Dados:**
    -   Spring Data JPA
    -   H2 Database (banco de dados em memória)
-   **Build Tool:** Gradle
-   **Containerização:**
    -   Docker
    -   Docker Compose

## 📊 Progresso Atual

Até o momento, a fundação da arquitetura de microsserviços foi implementada e está 100% funcional, com a comunicação entre os serviços validada.

### Microsserviços Concluídos:

#### 1. `discovery-service` (Eureka Server)
-   **Status:** ✅ Concluído e operacional.
-   **Descrição:** Atua como o "catálogo telefônico" da nossa arquitetura. Todos os outros serviços se registram nele ao iniciar, permitindo que se encontrem dinamicamente na rede.

#### 2. `product-service` (Microsserviço de Catálogo de Produtos)
-   **Status:** ✅ Concluído e operacional.
-   **Descrição:** Responsável por gerenciar o CRUD de produtos. Segue uma arquitetura interna Controller-Service-Repository e utiliza Spring Data JPA com um banco H2 para persistência dos dados.

#### 3. `order-service` (Microsserviço de Simulação de Pedidos)
-   **Status:** ✅ Concluído e operacional.
-   **Descrição:** Responsável por simular a criação de um pedido. Este serviço demonstra a comunicação entre microsserviços, utilizando **OpenFeign** para chamar a API do `product-service`, buscar os produtos por ID e calcular o valor total do pedido.

### Orquestração com Docker
-   **Status:** ✅ Concluído.
-   **Descrição:** Todos os três serviços foram containerizados utilizando `Dockerfile`. Um arquivo `docker-compose.yml` foi configurado para orquestrar a inicialização, a rede e as dependências entre os contêineres, permitindo que toda a arquitetura seja iniciada com um único comando.

## 🎯 Próximos Passos
O plano para finalizar o desafio inclui as seguintes etapas:

1.  **Implementação do API Gateway:**
    -   Criar o último microsserviço, que atuará como a porta de entrada única para todo o sistema.
    -   Configurar as rotas para redirecionar as requisições externas para os serviços internos corretos.

2.  **Implementação da Camada de Segurança (Requisito Extra):**
    -   Adicionar o Spring Security ao API Gateway para validar um Bearer Token fixo, protegendo todos os endpoints da aplicação.

## ⚙️ Como Executar o Projeto

**Pré-requisitos:**
-   Git
-   Docker e Docker Compose

**Passos:**
1.  Clone o repositório:
    ```bash
    git clone https://github.com/MateusLima909/desafio-microsservicos/
    ```
2.  Navegue para a pasta do projeto:
    ```bash
    cd desafio-microsservicos
    ```
3.  Execute o Docker Compose para construir as imagens e iniciar todos os contêineres em segundo plano:
    ```bash
    docker-compose up --build -d
    ```
4.  **Verificação:**
    -   Acesse o painel do Eureka em `http://localhost:8761` para ver os serviços registrados.
    -   Use uma ferramenta como Thunder Client ou Postman para interagir com as APIs através de suas respectivas portas (`8100` para produtos, `8200` para pedidos) ou, após a implementação do Gateway, através da porta unificada.
    
