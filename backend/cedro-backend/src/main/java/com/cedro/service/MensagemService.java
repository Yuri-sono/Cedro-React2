package com.cedro.service;

import com.cedro.model.dto.MensagemRequest;
import com.cedro.model.entity.Mensagem;
import com.cedro.repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensagemService {
    
    @Autowired
    private MensagemRepository mensagemRepository;
    
    public Mensagem enviarMensagem(Integer remetenteId, MensagemRequest request) {
        Mensagem mensagem = new Mensagem();
        mensagem.setRemetenteId(remetenteId);
        mensagem.setDestinatarioId(request.getDestinatarioId());
        mensagem.setMensagem(request.getMensagem());
        
        return mensagemRepository.save(mensagem);
    }
    
    public List<Mensagem> listarConversa(Integer userId1, Integer userId2) {
        return mensagemRepository.findConversaBetween(userId1, userId2);
    }
    
    public List<Mensagem> listarMensagensNaoLidas(Integer usuarioId) {
        return mensagemRepository.findByDestinatarioIdAndLidaFalseOrderByDataCriacaoDesc(usuarioId);
    }
    
    public long contarMensagensNaoLidas(Integer usuarioId) {
        return mensagemRepository.countByDestinatarioIdAndLidaFalse(usuarioId);
    }
    
    public void marcarComoLida(Integer mensagemId) {
        Mensagem mensagem = mensagemRepository.findById(mensagemId)
                .orElseThrow(() -> new RuntimeException("Mensagem não encontrada"));
        
        mensagem.setLida(true);
        mensagemRepository.save(mensagem);
    }
    
    public void marcarTodasComoLidas(Integer usuarioId, Integer remetenteId) {
        List<Mensagem> mensagens = mensagemRepository.findConversaBetween(usuarioId, remetenteId);
        mensagens.stream()
                .filter(m -> m.getDestinatarioId().equals(usuarioId) && !m.getLida())
                .forEach(m -> {
                    m.setLida(true);
                    mensagemRepository.save(m);
                });
    }
}