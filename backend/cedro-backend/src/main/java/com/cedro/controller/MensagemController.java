package com.cedro.controller;

import com.cedro.model.dto.MensagemRequest;
import com.cedro.model.entity.Mensagem;
import com.cedro.security.JwtUtil;
import com.cedro.service.MensagemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mensagens")
@CrossOrigin(origins = "*")
public class MensagemController {
    
    @Autowired
    private MensagemService mensagemService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    private Integer getUserIdFromToken(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtUtil.extractUserId(token);
    }
    
    @PostMapping
    public ResponseEntity<?> enviarMensagem(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody MensagemRequest request) {
        try {
            Integer remetenteId = getUserIdFromToken(authHeader);
            Mensagem mensagem = mensagemService.enviarMensagem(remetenteId, request);
            return ResponseEntity.ok(mensagem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/conversa/{userId}")
    public ResponseEntity<?> listarConversa(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer userId) {
        try {
            Integer meuId = getUserIdFromToken(authHeader);
            List<Mensagem> mensagens = mensagemService.listarConversa(meuId, userId);
            return ResponseEntity.ok(mensagens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/nao-lidas")
    public ResponseEntity<?> listarMensagensNaoLidas(@RequestHeader("Authorization") String authHeader) {
        try {
            Integer usuarioId = getUserIdFromToken(authHeader);
            List<Mensagem> mensagens = mensagemService.listarMensagensNaoLidas(usuarioId);
            return ResponseEntity.ok(mensagens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/nao-lidas/count")
    public ResponseEntity<?> contarMensagensNaoLidas(@RequestHeader("Authorization") String authHeader) {
        try {
            Integer usuarioId = getUserIdFromToken(authHeader);
            long count = mensagemService.contarMensagensNaoLidas(usuarioId);
            return ResponseEntity.ok(Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/lida")
    public ResponseEntity<?> marcarComoLida(@PathVariable Integer id) {
        try {
            mensagemService.marcarComoLida(id);
            return ResponseEntity.ok(Map.of("message", "Mensagem marcada como lida"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/marcar-lidas/{remetenteId}")
    public ResponseEntity<?> marcarTodasComoLidas(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer remetenteId) {
        try {
            Integer usuarioId = getUserIdFromToken(authHeader);
            mensagemService.marcarTodasComoLidas(usuarioId, remetenteId);
            return ResponseEntity.ok(Map.of("message", "Mensagens marcadas como lidas"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}