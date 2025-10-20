package com.cedro.repository;

import com.cedro.model.entity.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Integer> {
    List<Sessao> findByPacienteId(Integer pacienteId);
    List<Sessao> findByTerapeutaId(Integer terapeutaId);
    List<Sessao> findByStatusSessao(String status);
}
