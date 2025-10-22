package com.cedro.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

public class UpdatePerfilRequest {
    private String nome;
    private String telefone;
    
    @JsonProperty("dataNascimento")
    private LocalDate dataNascimento;
    
    private String genero;
    private String endereco;
    private String bio;
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }
    
    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
    
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}
