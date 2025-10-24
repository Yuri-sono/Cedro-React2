package com.cedro.controller;

import com.cedro.model.TipoUsuario;
import com.cedro.model.entity.Usuario;
import com.cedro.repository.UsuarioRepository;
import com.cedro.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/psicologos")
public class PsicologoController {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // READ - Listar todos os psicólogos
    @GetMapping
    public ResponseEntity<?> listarPsicologos() {
        try {
            List<Usuario> psicologos = usuarioRepository.findByTipoUsuarioAndAtivo(TipoUsuario.psicologo, true);
            return ResponseEntity.ok(psicologos);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Erro ao buscar psicólogos: " + e.getMessage()));
        }
    }
    
    // READ - Buscar psicólogo por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer id) {
        try {
            Usuario psicologo = usuarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Psicólogo não encontrado"));
            
            if (psicologo.getTipoUsuario() != TipoUsuario.psicologo) {
                return ResponseEntity.status(400)
                        .body(Map.of("error", "Usuário não é psicólogo"));
            }
            
            return ResponseEntity.ok(psicologo);
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    // CREATE - Criar novo psicólogo
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Usuario psicologo) {
        try {
            if (usuarioRepository.existsByEmail(psicologo.getEmail())) {
                return ResponseEntity.status(400)
                        .body(Map.of("error", "Email já cadastrado"));
            }
            
            psicologo.setTipoUsuario(TipoUsuario.psicologo);
            psicologo.setAtivo(true);
            Usuario salvo = usuarioRepository.save(psicologo);
            
            return ResponseEntity.status(201).body(salvo);
        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", "Erro ao criar psicólogo: " + e.getMessage()));
        }
    }
    
    // UPDATE - Atualizar psicólogo
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Integer id, @RequestBody Usuario dados) {
        try {
            Usuario psicologo = usuarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Psicólogo não encontrado"));
            
            if (psicologo.getTipoUsuario() != TipoUsuario.psicologo) {
                return ResponseEntity.status(400)
                        .body(Map.of("error", "Usuário não é psicólogo"));
            }
            
            if (dados.getNome() != null) psicologo.setNome(dados.getNome());
            if (dados.getEmail() != null) psicologo.setEmail(dados.getEmail());
            if (dados.getTelefone() != null) psicologo.setTelefone(dados.getTelefone());
            if (dados.getEspecialidade() != null) psicologo.setEspecialidade(dados.getEspecialidade());
            if (dados.getPrecoSessao() != null) psicologo.setPrecoSessao(dados.getPrecoSessao());
            if (dados.getBio() != null) psicologo.setBio(dados.getBio());
            if (dados.getFotoUrl() != null) psicologo.setFotoUrl(dados.getFotoUrl());
            
            Usuario atualizado = usuarioRepository.save(psicologo);
            return ResponseEntity.ok(atualizado);
        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    // DELETE - Deletar psicólogo (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id) {
        try {
            Usuario psicologo = usuarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Psicólogo não encontrado"));
            
            if (psicologo.getTipoUsuario() != TipoUsuario.psicologo) {
                return ResponseEntity.status(400)
                        .body(Map.of("error", "Usuário não é psicólogo"));
            }
            
            psicologo.setAtivo(false);
            usuarioRepository.save(psicologo);
            
            return ResponseEntity.ok(Map.of("message", "Psicólogo desativado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/estatisticas")
    public ResponseEntity<?> getEstatisticas(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            jwtUtil.extractUserId(token);
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("consultasHoje", 5);
            stats.put("consultasSemana", 23);
            stats.put("pacientesAtivos", 45);
            stats.put("faturamentoMes", 8500.00);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
