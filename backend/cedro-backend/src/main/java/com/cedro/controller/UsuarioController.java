package com.cedro.controller;

import com.cedro.model.entity.Usuario;
import com.cedro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @GetMapping("/psicologos")
    public ResponseEntity<List<Usuario>> getPsicologos() {
        List<Usuario> psicologos = usuarioRepository.findByTipoUsuarioAndAtivoTrue(com.cedro.model.TipoUsuario.psicologo);
        return ResponseEntity.ok(psicologos);
    }
}
