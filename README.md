# 🚀 Desafio NTT DATA - Microservices Architecture

> **Sistema robusto de gestão de pedidos e catálogo utilizando arquitetura de microsserviços, Spring Cloud e orquestração via Docker.**

![Java](https://img.shields.io/badge/Java-21-ED8B00)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-6DB33F)
![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-Gateway-6DB33F)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)
![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)

## 📖 Sobre o Projeto

Este projeto é a implementação do Desafio Técnico proposto pela **NTT DATA** em parceria com a **DIO**.

O objetivo foi desenvolver um ecossistema completo de microsserviços para gestão de produtos e simulação de pedidos. O foco principal não é apenas o CRUD, mas a **infraestrutura arquitetural**: como os serviços se descobrem, como se comunicam e como são protegidos.

### ✨ Conceitos Chave Aplicados

* **Service Discovery:** Registro dinâmico de serviços com *Eureka Server*.
* **API Gateway:** Ponto único de entrada e roteamento inteligente.
* **Comunicação Síncrona:** Uso de *OpenFeign* para comunicação entre APIs.
* **Segurança Centralizada:** Validação de Token no Gateway.
* **Documentação Unificada:** Agregação de Swagger UI no Gateway.

---

## 🏗️ Arquitetura dos Serviços

O sistema é composto por 4 contêineres orquestrados:

1.  **`discovery-service` (Eureka Server):** O "catálogo telefônico" onde todos os microsserviços se registram.
2.  **`api-gateway` (Porta 8765):** A porta de entrada. Gerencia roteamento, segurança e documentação.
3.  **`product-service`:** Gerencia o catálogo de produtos (Persistência em H2).
4.  **`order-service`:** Simula pedidos e consome o `product-service` para buscar detalhes dos itens.

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** Java 21
* **Framework:** Spring Boot 3.3.2
* **Ecossistema Cloud:** Spring Cloud Gateway, Netflix Eureka, OpenFeign
* **Build Tool:** Gradle
* **Containerização:** Docker & Docker Compose
* **Banco de Dados:** H2 Database (In-Memory)
* **Documentação:** SpringDoc OpenAPI (Swagger)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

* Docker e Docker Compose instalados.
* Git instalado.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/MateusLima909/desafio-microsservicos.git
    cd desafio-microsservicos
    ```

2.  **Suba a infraestrutura (Docker):**
    ```bash
    docker-compose up --build
    ```
    *(Aguarde até que todos os serviços estejam registrados no Eureka)*

3.  **Verifique o Status:**
    * **Eureka Dashboard:** `http://localhost:8761`
    * **Swagger Unificado:** `http://localhost:8765/swagger-ui.html`

### 🔐 Autenticação (Importante!)

O sistema possui uma camada de segurança. Para testar os endpoints (POST, PUT, DELETE), você deve incluir o token no Header da requisição:

* **Key:** `Authorization`
* **Value:** `Bearer meu-token-secreto`

---

## 🗺️ Roadmap (Próximos Passos)

- [ ] **Segurança Avançada:** Migrar do token estático para autenticação dinâmica com **JWT** e OAuth2.
- [ ] **Front-end:** Implementar uma interface visual para consumo das APIs.
- [x] **Containerização:** Orquestração completa com Docker Compose.
- [x] **Gateway:** Implementação de filtro global de segurança.

---

## 🤝 Contribuição

Sugestões e melhorias arquiteturais são bem-vindas!

## 📝 Autor

Desenvolvido por **[Mateus Lima](https://www.linkedin.com/in/mateuslima-santos)**.
