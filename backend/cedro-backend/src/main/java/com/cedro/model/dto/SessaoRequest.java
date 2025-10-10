package com.cedro.model.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SessaoRequest {
    
    @NotNull
    private Integer terapeutaId;
    
    @NotNull
    private LocalDateTime dataSessao;
    
    private Integer duracao = 60;
    
    @NotNull
    private BigDecimal valor;
    
    private String observacoes;
    
    public SessaoRequest() {}
    
    public Integer getTerapeutaId() { return terapeutaId; }
    public void setTerapeutaId(Integer terapeutaId) { this.terapeutaId = terapeutaId; }
    
    public LocalDateTime getDataSessao() { return dataSessao; }
    public void setDataSessao(LocalDateTime dataSessao) { this.dataSessao = dataSessao; }
    
    public Integer getDuracao() { return duracao; }
    public void setDuracao(Integer duracao) { this.duracao = duracao; }
    
    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }
    
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}