package com.cedro.model.dto;

import com.cedro.model.TipoUsuario;
import java.time.LocalDate;

public class UsuarioResponse {
    
    private Integer id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;
    private String telefone;
    private LocalDate data_nascimento;
    private String genero;
    private String endereco;
    private String bio;
    
    public UsuarioResponse() {}
    
    public UsuarioResponse(Integer id, String nome, String email, TipoUsuario tipoUsuario,
                          String telefone, LocalDate data_nascimento, String genero, 
                          String endereco, String bio) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
        this.telefone = telefone;
        this.data_nascimento = data_nascimento;
        this.genero = genero;
        this.endereco = endereco;
        this.bio = bio;
    }
    
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public TipoUsuario getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(TipoUsuario tipoUsuario) { this.tipoUsuario = tipoUsuario; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public LocalDate getData_nascimento() { return data_nascimento; }
    public void setData_nascimento(LocalDate data_nascimento) { this.data_nascimento = data_nascimento; }
    
    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
    
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}