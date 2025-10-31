package edu.mateus.catalogoprodutos.apigateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final static Logger log = LoggerFactory.getLogger(AuthController.class);
    private final TokenService tokenService;

    public AuthController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<LoginResponse>> login(@RequestBody Mono<LoginRequest> loginRequestMono) {
        return loginRequestMono.flatMap(loginRequest -> {
            if("admin".equals(loginRequest.username()) && "admin123".equals(loginRequest.password())) {
                log.info("Login válido para o usuário: {}", loginRequest.username());

                String token = tokenService.generateToken(loginRequest.username());
                LoginResponse response = new LoginResponse(token);

                return Mono.just(ResponseEntity.ok(response));
            } else {
                log.warn("Tentativa de login falhou para o usuário: {}", loginRequest.username());

                return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
            }
        });
    }
}