package com.cedro.controller;

import com.cedro.model.dto.SessaoRequest;
import com.cedro.model.entity.Sessao;
import com.cedro.service.SessaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sessoes")
@CrossOrigin(origins = "http://localhost:3000")
public class SessaoController {
    
    @Autowired
    private SessaoService sessaoService;
    
    @GetMapping
    public ResponseEntity<List<Sessao>> listarTodas() {
        return ResponseEntity.ok(sessaoService.listarTodas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Sessao> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(sessaoService.buscarPorId(id));
    }
    
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Sessao>> listarPorPaciente(@PathVariable Integer pacienteId) {
        return ResponseEntity.ok(sessaoService.listarPorPaciente(pacienteId));
    }
    
    @GetMapping("/terapeuta/{terapeutaId}")
    public ResponseEntity<List<Sessao>> listarPorTerapeuta(@PathVariable Integer terapeutaId) {
        return ResponseEntity.ok(sessaoService.listarPorTerapeuta(terapeutaId));
    }
    
    @PostMapping
    public ResponseEntity<Sessao> criar(@RequestBody SessaoRequest request) {
        try {
            Sessao sessao = sessaoService.criar(request);
            return ResponseEntity.status(201).body(sessao);
        } catch (Exception e) {
            return ResponseEntity.status(400).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Sessao> atualizar(@PathVariable Integer id, @RequestBody SessaoRequest request) {
        try {
            Sessao sessao = sessaoService.atualizar(id, request);
            return ResponseEntity.ok(sessao);
        } catch (Exception e) {
            return ResponseEntity.status(400).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Integer id) {
        try {
            sessaoService.deletar(id);
            return ResponseEntity.ok(Map.of("message", "Sessão deletada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
}
