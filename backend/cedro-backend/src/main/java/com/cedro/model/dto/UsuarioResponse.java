package com.cedro.model.dto;

import com.cedro.model.TipoUsuario;

public class UsuarioResponse {
    
    private Integer id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;
    
    public UsuarioResponse() {}
    
    public UsuarioResponse(Integer id, String nome, String email, TipoUsuario tipoUsuario) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }
    
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public TipoUsuario getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(TipoUsuario tipoUsuario) { this.tipoUsuario = tipoUsuario; }
}