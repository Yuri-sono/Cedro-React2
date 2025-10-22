package com.cedro.controller;

import com.cedro.model.entity.Usuario;
import com.cedro.repository.MensagemRepository;
import com.cedro.repository.SessaoRepository;
import com.cedro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173", "http://localhost:3000", "https://cedro-eight.vercel.app"})
public class UsuarioController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private SessaoRepository sessaoRepository;
    
    @Autowired
    private MensagemRepository mensagemRepository;
    
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
    
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Integer id, @RequestBody Usuario dados) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    if (dados.getNome() != null) usuario.setNome(dados.getNome());
                    if (dados.getEmail() != null) usuario.setEmail(dados.getEmail());
                    if (dados.getTelefone() != null) usuario.setTelefone(dados.getTelefone());
                    if (dados.getEspecialidade() != null) usuario.setEspecialidade(dados.getEspecialidade());
                    if (dados.getPrecoSessao() != null) usuario.setPrecoSessao(dados.getPrecoSessao());
                    if (dados.getBio() != null) usuario.setBio(dados.getBio());
                    if (dados.getDataNascimento() != null) usuario.setDataNascimento(dados.getDataNascimento());
                    if (dados.getGenero() != null) usuario.setGenero(dados.getGenero());
                    usuarioRepository.save(usuario);
                    return ResponseEntity.ok(usuario);
                })
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
    @Transactional
    public ResponseEntity<?> deletar(@PathVariable Integer id) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    sessaoRepository.deleteByPacienteId(id);
                    sessaoRepository.deleteByPsicologoId(id);
                    mensagemRepository.deleteByRemetenteId(id);
                    mensagemRepository.deleteByDestinatarioId(id);
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.ok(Map.of("message", "Usuário deletado"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
