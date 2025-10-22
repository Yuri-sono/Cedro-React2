package com.cedro.repository;

import com.cedro.model.entity.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Integer> {
    List<Sessao> findByPacienteId(Integer pacienteId);
    List<Sessao> findByPsicologoId(Integer psicologoId);
    List<Sessao> findByStatusSessao(String status);

    @Modifying
    @Query("DELETE FROM Sessao s WHERE s.pacienteId = ?1")
    void deleteByPacienteId(Integer pacienteId);

    @Modifying
    @Query("DELETE FROM Sessao s WHERE s.psicologoId = ?1")
    void deleteByPsicologoId(Integer psicologoId);
}
