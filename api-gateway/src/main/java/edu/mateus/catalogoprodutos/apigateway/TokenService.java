package edu.mateus.catalogoprodutos.apigateway;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class TokenService {
    private static final Logger log = LoggerFactory.getLogger(TokenService.class);
    private final long EXPIRATION_TIME_MS = 3600000; //1 Hora
    private final SecretKey key;

    public TokenService (@Value("${app.jwt.secret}") String secretString) {
        this.key = Keys.hmacShaKeyFor(secretString.getBytes(StandardCharsets.UTF_8));
        log.info("Chave secreta JWT carregada com sucesso!");
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME_MS);

        String token = Jwts.builder()
                        .setSubject(username)
                        .setIssuedAt(now)
                        .setExpiration(expiryDate)
                        .signWith(key)
                        .compact();
                    
        log.info("Token gerado para o usuário: {}", username);
        return token;
    }

    public String validateToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return claims.getSubject();
        } catch (SecurityException | MalformedJwtException e) {
            log.warn("Token JWT inválido (assinatura ou formato): {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.warn("Token JWT expirado: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.warn("Token JWT não suportado: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("Token JWT com claim vazias: {}", e.getMessage());
        }

        return null;
    }
}