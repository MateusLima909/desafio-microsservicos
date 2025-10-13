package edu.mateus.catalogoprodutos.apigateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class AuthenticationFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationFilter.class);
    private static final String BEARER_TOKEN = "Bearer meu-token-secreto";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("--- 🚀 FILTRO DE AUTENTICAÇÃO ATIVADO 🚀 ---");

        String path = exchange.getRequest().getURI().getPath();

        if (path.contains("/swagger-ui") || path.contains("/v3/api-docs")) {
            return chain.filter(exchange);
        }

        List<String> authHeaders = exchange.getRequest().getHeaders().getOrEmpty("Authorization");

        if (authHeaders.isEmpty()) {
            log.warn("❌ Nenhum Authorization header recebido");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeaders.get(0).trim();
        log.info("🔑 Header Authorization recebido: {}", token);

        if (!token.equalsIgnoreCase(BEARER_TOKEN)) {
            log.warn("🚫 Token inválido! Esperado: '{}', Recebido: '{}'", BEARER_TOKEN, token);
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        log.info("✅ Token válido! Acesso liberado para {}", path);
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
