# Build da aplicação com Gradle
FROM gradle:8.5.0-jdk21 AS build
WORKDIR /app
COPY build.gradle ./
RUN gradle dependencies --no-daemon
COPY src ./src
RUN gradle build --no-daemon -x test

# Imagem final, otimizada para execução
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]