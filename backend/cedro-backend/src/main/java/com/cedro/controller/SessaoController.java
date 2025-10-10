package com.cedro.controller;

import com.cedro.model.dto.SessaoRequest;
import com.cedro.model.entity.Sessao;
import com.cedro.security.JwtUtil;
import com.cedro.service.SessaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sessoes")
@CrossOrigin(origins = "*")
public class SessaoController {
    
    @Autowired
    private SessaoService sessaoService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    private Integer getUserIdFromToken(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtUtil.extractUserId(token);
    }
    
    @PostMapping
    public ResponseEntity<?> agendarSessao(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody SessaoRequest request) {
        try {
            Integer pacienteId = getUserIdFromToken(authHeader);
            Sessao sessao = sessaoService.agendarSessao(pacienteId, request);
            return ResponseEntity.ok(sessao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/minhas")
    public ResponseEntity<?> listarMinhasSessoes(@RequestHeader("Authorization") String authHeader) {
        try {
            Integer usuarioId = getUserIdFromToken(authHeader);
            List<Sessao> sessoes = sessaoService.listarMinhasSessoes(usuarioId);
            return ResponseEntity.ok(sessoes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/terapeuta")
    public ResponseEntity<?> listarSessoesComoTerapeuta(@RequestHeader("Authorization") String authHeader) {
        try {
            Integer terapeutaId = getUserIdFromToken(authHeader);
            List<Sessao> sessoes = sessaoService.listarSessoesComoTerapeuta(terapeutaId);
            return ResponseEntity.ok(sessoes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(
            @PathVariable Integer id,
            @RequestBody Map<String, String> body) {
        try {
            String novoStatus = body.get("status");
            Sessao sessao = sessaoService.atualizarStatus(id, novoStatus);
            return ResponseEntity.ok(sessao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelarSessao(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {
        try {
            Integer usuarioId = getUserIdFromToken(authHeader);
            sessaoService.cancelarSessao(id, usuarioId);
            return ResponseEntity.ok(Map.of("message", "Sessão cancelada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}