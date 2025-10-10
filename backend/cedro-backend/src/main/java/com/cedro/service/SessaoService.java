package com.cedro.service;

import com.cedro.model.dto.SessaoRequest;
import com.cedro.model.entity.Sessao;
import com.cedro.repository.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessaoService {
    
    @Autowired
    private SessaoRepository sessaoRepository;
    
    public Sessao agendarSessao(Integer pacienteId, SessaoRequest request) {
        Sessao sessao = new Sessao();
        sessao.setPacienteId(pacienteId);
        sessao.setTerapeutaId(request.getTerapeutaId());
        sessao.setDataSessao(request.getDataSessao());
        sessao.setDuracao(request.getDuracao());
        sessao.setValor(request.getValor());
        sessao.setObservacoes(request.getObservacoes());
        
        return sessaoRepository.save(sessao);
    }
    
    public List<Sessao> listarMinhasSessoes(Integer usuarioId) {
        return sessaoRepository.findByPacienteIdOrderByDataSessaoDesc(usuarioId);
    }
    
    public List<Sessao> listarSessoesComoTerapeuta(Integer terapeutaId) {
        return sessaoRepository.findByTerapeutaIdOrderByDataSessaoDesc(terapeutaId);
    }
    
    public Sessao atualizarStatus(Integer sessaoId, String novoStatus) {
        Sessao sessao = sessaoRepository.findById(sessaoId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));
        
        sessao.setStatusSessao(novoStatus);
        return sessaoRepository.save(sessao);
    }
    
    public void cancelarSessao(Integer sessaoId, Integer usuarioId) {
        Sessao sessao = sessaoRepository.findById(sessaoId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));
        
        if (!sessao.getPacienteId().equals(usuarioId) && !sessao.getTerapeutaId().equals(usuarioId)) {
            throw new RuntimeException("Você não tem permissão para cancelar esta sessão");
        }
        
        sessao.setStatusSessao("cancelada");
        sessaoRepository.save(sessao);
    }
}