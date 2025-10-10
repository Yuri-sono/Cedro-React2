package com.cedro.repository;

import com.cedro.model.entity.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Integer> {
    
    List<Sessao> findByPacienteIdOrderByDataSessaoDesc(Integer pacienteId);
    
    List<Sessao> findByTerapeutaIdOrderByDataSessaoDesc(Integer terapeutaId);
    
    List<Sessao> findByPacienteIdAndStatusSessao(Integer pacienteId, String status);
    
    List<Sessao> findByTerapeutaIdAndStatusSessao(Integer terapeutaId, String status);
}