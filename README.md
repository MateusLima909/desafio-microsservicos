# 🚀 PECStore - E-commerce Full-Stack & Microservices Architecture

> **Plataforma completa de e-commerce com gestão de catálogo, pedidos e usuários, utilizando arquitetura de microsserviços no back-end (Spring Cloud), segurança JWT e interface reativa no front-end (Angular).**

![Java](https://img.shields.io/badge/Java-21-ED8B00)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-6DB33F)
![Angular](https://img.shields.io/badge/Angular-DD0031)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)
![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)

## 📖 Sobre o Projeto

Este projeto é um ecossistema completo de e-commerce desenvolvido do zero, abrangendo tanto a construção da interface gráfica (Front-end) quanto a engenharia de dados e regras de negócio (Back-end).

O objetivo principal do sistema foi aplicar os mais modernos padrões de arquitetura corporativa, focando em como os serviços se descobrem dinamicamente, como se comunicam em rede, como isolam seus dados e como a aplicação se protege através de autenticação *stateless*.

### ✨ Conceitos Chave Aplicados

* **Service Discovery:** Registro dinâmico de serviços com *Eureka Server*.
* **API Gateway:** Ponto único de entrada, resolução de CORS e roteamento inteligente.
* **Segurança Stateless (JWT):** Geração, criptografia e validação de Tokens JWT gerenciados de forma centralizada.
* **Database per Service:** Isolamento de bancos de dados (PostgreSQL para Auth, H2 para Catálogo).
* **Comunicação Síncrona:** Uso de *OpenFeign* para comunicação interna segura entre APIs.
* **Reatividade no Front-end:** Gerenciamento de estado global (Carrinho de Compras) utilizando Angular Signals de forma nativa e limpa.
* **Segurança no Client-Side:** Implementação de Route Guards lógicos e proteção de rotas para usuários não logados.

---

## 🏗️ Arquitetura do Sistema

O projeto é dividido em um cliente Web e múltiplos microsserviços orquestrados:

### Front-end (Client)
* **`frontend-catalogo` (Angular):** Interface SPA (Single Page Application) responsiva, com consumo dinâmico das APIs, modais interativos (SweetAlert2) e validação avançada de formulários.

### Back-end (Microsserviços)
1.  **`discovery-service` (Eureka Server):** O "catálogo de endereços" onde os microsserviços se registram dinamicamente.
2.  **`api-gateway` (Porta 8765):** A porta de entrada do Front-end. Gerencia o roteamento e a camada inicial de segurança.
3.  **`auth-service`:** Serviço responsável pela criação de contas e emissão de tokens JWT. Persiste dados em **PostgreSQL**.
4.  **`product-service`:** Gerencia o catálogo de produtos e controle de estoque (Persistência em H2).
5.  **`order-service`:** Processa o carrinho, registra os pedidos do usuário e consome o `product-service` internamente.

---

## 🛠️ Tecnologias Utilizadas

**Front-end:**
* Angular 17+ (Standalone Components & Signals)
* TypeScript
* HTML5 / CSS3
* SweetAlert2 (UI/UX Feedbacks)

**Back-end & Infraestrutura:**
* Java 21
* Spring Boot 3.3.x / Spring Cloud / Spring Security
* PostgreSQL & H2 Database
* JSON Web Tokens (JWT)
* OpenFeign
* Gradle
* Docker & Docker Compose
* SpringDoc OpenAPI (Swagger UI)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

* Docker e Docker Compose instalados.
* Node.js e Angular CLI instalados.
* Git instalado.

### 1. Subindo a infraestrutura Back-end (Docker)

Abra o terminal na raiz do projeto e execute:
```bash
docker-compose up --build
```

*(Aguarde até que os serviços subam e se registrem no Eureka. Pode levar alguns minutos na primeira execução).*

* **Eureka Dashboard:** `http://localhost:8761`
* **API Gateway:** `http://localhost:8765`

### 2. Rodando o Front-end (Angular)

Abra um **novo terminal**, acesse a pasta do front-end e inicie a aplicação:
```bash
cd frontend-catalogo
npm install
ng serve
```

* **Acesse a loja no navegador:** `http://localhost:4200`

---

## 🔐 Autenticação e Fluxo de Compra

Para realizar compras no sistema, o usuário deve passar pelo fluxo de segurança:

1. **Cadastro/Login:** O front-end envia as credenciais para o `auth-service` através do Gateway.
2. **Geração do Token:** O back-end valida no banco de dados e retorna um token JWT criptografado.
3. **Armazenamento:** O Angular armazena o token de forma segura no `localStorage`.
4. **Requisições Protegidas:** Ao finalizar o pedido, o Front-end injeta automaticamente o Header `Authorization: Bearer <token>` liberando a transação no `order-service`.

---

## 🗺️ Roadmap (Evolução do Projeto)

- [x] Containerização com Docker Compose.
- [x] Implementação do API Gateway e Service Discovery.
- [x] Front-end em Angular com Signals.
- [x] Segurança Avançada com Auth Service, PostgreSQL e JWT.
- [ ] Mensageria assíncrona (RabbitMQ ou Kafka) para processamento de pagamentos.
- [ ] Pipeline de CI/CD (GitHub Actions).

---

## 📝 Autor

Desenvolvido por **[Mateus Lima](https://www.linkedin.com/in/mateuslima-santos)**.
