package com.cedro.controller;

import com.cedro.model.dto.PsicologoResponse;
import com.cedro.model.entity.Usuario;
import com.cedro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }
    
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/usuarios/{id}/ativar")
    public ResponseEntity<?> ativarDesativar(@PathVariable Integer id, @RequestBody Map<String, Boolean> body) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setAtivo(body.get("ativo"));
                    usuarioRepository.save(usuario);
                    return ResponseEntity.ok(Map.of("message", "Status atualizado"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.ok(Map.of("message", "Usuário deletado"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/psicologos")
    public ResponseEntity<List<PsicologoResponse>> getPsicologos() {
        List<Usuario> psicologos = usuarioRepository.findByTipoUsuarioAndAtivoTrue(com.cedro.model.TipoUsuario.psicologo);
        
        List<PsicologoResponse> response = psicologos.stream()
            .map(p -> new PsicologoResponse(
                p.getId(),
                p.getNome(),
                p.getEmail(),
                p.getTelefone(),
                p.getBio(),
                p.getEspecialidade(),
                p.getPrecoSessao(),
                p.getAvaliacao(),
                p.getFotoUrl()
            ))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
}
