# Build da aplicação com Gradle
# Imagem que já vem com Gradle e Java 21
FROM gradle:8.5.0-jdk21 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de build do Gradle para otimizar o cache do Docker
COPY build.gradle settings.gradle ./
COPY gradle ./gradle

# Copia o código-fonte da aplicação
COPY src ./src

# Roda o comando do Gradle para construir o projeto (pulando os testes)
RUN gradle build --no-daemon -x test

# Imagem final, otimizada para execução
# Usamos uma imagem "slim" que só tem o Java Runtime
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copia apenas o .jar gerado no estágio de build
# Para Gradle, o arquivo fica em 'build/libs/'
COPY --from=build /app/build/libs/*.jar app.jar

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]