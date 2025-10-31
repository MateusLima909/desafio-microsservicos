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
    private final TokenService tokenService;

    public AuthenticationFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("--- 🚀 FILTRO DE AUTENTICAÇÃO ATIVADO 🚀 ---");

        String path = exchange.getRequest().getURI().getPath();

        if (path.contains("/swagger-ui") || path.contains("/v3/api-docs") || path.contains("/api/auth/login")) {
            log.info("Rota pública. Acesso liberado sem token para: {}", path);
            return chain.filter(exchange);
        }

        List<String> authHeaders = exchange.getRequest().getHeaders().getOrEmpty("Authorization");

        if (authHeaders.isEmpty()) {
            log.warn("❌ Nenhum Authorization header recebido");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String authHeader = authHeaders.get(0).trim();

        if (!authHeader.startsWith("Bearer ")) {
            log.warn("🚫 Header Authorization inválido! Não começa com 'Bearer '");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        String username = tokenService.validateToken(token);

        if (username == null) {
            log.warn("🚫 Token JWT inválido ou expirado!");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        exchange.getRequest().mutate()
                .header("X-Authenticated-User", username)
                .build();

        log.info("✅ Token JWT válido! Usuário: {}. Acesso liberado para {}", username, path);
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
