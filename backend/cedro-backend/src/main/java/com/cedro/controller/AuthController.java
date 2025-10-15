package com.cedro.controller;

import com.cedro.model.dto.*;
import com.cedro.security.JwtUtil;
import com.cedro.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).build();
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            authService.register(request);
            return ResponseEntity.status(201)
                    .body(Map.of("message", "Usuário criado com sucesso!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String nome = request.get("nome");
            
            if (email == null || nome == null) {
                return ResponseEntity.status(400)
                        .body(Map.of("error", "Email e nome são obrigatórios"));
            }
            
            LoginResponse response = authService.googleLogin(email, nome);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API Cedro rodando!");
    }
    
    @PutMapping("/perfil")
    public ResponseEntity<?> updatePerfil(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UpdatePerfilRequest request) {
        try {
            String token = authHeader.replace("Bearer ", "");
            Integer userId = jwtUtil.extractUserId(token);
            
            Map<String, Object> response = authService.updatePerfil(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/alterar-senha")
    public ResponseEntity<?> alterarSenha(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody AlterarSenhaRequest request) {
        try {
            String token = authHeader.replace("Bearer ", "");
            Integer userId = jwtUtil.extractUserId(token);
            
            Map<String, Object> response = authService.alterarSenha(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/conta")
    public ResponseEntity<?> excluirConta(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            Integer userId = jwtUtil.extractUserId(token);
            
            authService.excluirConta(userId);
            return ResponseEntity.ok(Map.of("message", "Conta excluída com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}