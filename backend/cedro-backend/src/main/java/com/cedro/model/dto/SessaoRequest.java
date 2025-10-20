package com.cedro.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SessaoRequest {
    
    @JsonProperty("paciente_id")
    private Integer pacienteId;
    
    @JsonProperty("terapeuta_id")
    private Integer terapeutaId;
    
    @JsonProperty("data_sessao")
    private LocalDateTime dataSessao;
    
    private Integer duracao;
    private BigDecimal valor;
    
    @JsonProperty("status_sessao")
    private String statusSessao;
    
    private String observacoes;
    
    public Integer getPacienteId() { return pacienteId; }
    public void setPacienteId(Integer pacienteId) { this.pacienteId = pacienteId; }
    
    public Integer getTerapeutaId() { return terapeutaId; }
    public void setTerapeutaId(Integer terapeutaId) { this.terapeutaId = terapeutaId; }
    
    public LocalDateTime getDataSessao() { return dataSessao; }
    public void setDataSessao(LocalDateTime dataSessao) { this.dataSessao = dataSessao; }
    
    public Integer getDuracao() { return duracao; }
    public void setDuracao(Integer duracao) { this.duracao = duracao; }
    
    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }
    
    public String getStatusSessao() { return statusSessao; }
    public void setStatusSessao(String statusSessao) { this.statusSessao = statusSessao; }
    
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}
