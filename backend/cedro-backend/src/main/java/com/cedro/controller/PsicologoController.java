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
@CrossOrigin(origins = "http://localhost:3000")
public class PsicologoController {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @GetMapping("/api/psicologos")
    public ResponseEntity<?> listarPsicologos() {
        try {
            List<Usuario> psicologos = usuarioRepository.findByTipoUsuarioAndAtivo(TipoUsuario.TERAPEUTA, true);
            return ResponseEntity.ok(psicologos);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Erro ao buscar psicólogos: " + e.getMessage()));
        }
    }
    
    @GetMapping("/api/psicologo/estatisticas")
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
