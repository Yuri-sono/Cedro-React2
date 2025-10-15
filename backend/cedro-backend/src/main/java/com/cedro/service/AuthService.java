package com.cedro.service;

import com.cedro.model.dto.*;
import com.cedro.model.TipoUsuario;
import com.cedro.model.entity.Usuario;
import com.cedro.repository.UsuarioRepository;
import com.cedro.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmailAndAtivoTrue(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));
        
        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenhaHash())) {
            throw new RuntimeException("Credenciais inválidas");
        }
        
        String token = jwtUtil.generateToken(
                usuario.getId(), 
                usuario.getEmail(), 
                usuario.getTipoUsuario().name()
        );
        
        UsuarioResponse usuarioResponse = new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTipoUsuario(),
                usuario.getTelefone(),
                usuario.getDataNascimento(),
                usuario.getGenero(),
                usuario.getEndereco(),
                usuario.getBio()
        );
        
        return new LoginResponse(token, usuarioResponse);
    }
    
    public void register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        String senha = request.getSenha();
        if (senha.length() < 5) {
            throw new RuntimeException("A senha deve ter no mínimo 5 caracteres");
        }
        if (!senha.matches(".*\\d.*")) {
            throw new RuntimeException("A senha deve conter pelo menos 1 número");
        }
        if (!senha.matches(".*[!@#$%^&*(),.?\"':{}|<>].*")) {
            throw new RuntimeException("A senha deve conter pelo menos 1 caractere especial");
        }
        
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenhaHash(passwordEncoder.encode(request.getSenha()));
        usuario.setDataNascimento(request.getDataNascimento());
        usuario.setGenero(request.getGenero());
        usuario.setTelefone(request.getTelefone());
        usuario.setTipoUsuario(request.getTipoUsuario());
        
        usuarioRepository.save(usuario);
    }
    
    public LoginResponse googleLogin(String email, String nome) {
        Usuario usuario = usuarioRepository.findByEmailAndAtivoTrue(email)
                .orElseGet(() -> {
                    Usuario novoUsuario = new Usuario();
                    novoUsuario.setNome(nome);
                    novoUsuario.setEmail(email);
                    novoUsuario.setSenhaHash(passwordEncoder.encode("google_oauth_" + System.currentTimeMillis()));
                    novoUsuario.setTipoUsuario(TipoUsuario.paciente);
                    return usuarioRepository.save(novoUsuario);
                });
        
        String token = jwtUtil.generateToken(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getTipoUsuario().name()
        );
        
        UsuarioResponse usuarioResponse = new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTipoUsuario(),
                usuario.getTelefone(),
                usuario.getDataNascimento(),
                usuario.getGenero(),
                usuario.getEndereco(),
                usuario.getBio()
        );
        
        return new LoginResponse(token, usuarioResponse);
    }
    
    public Map<String, Object> updatePerfil(Integer userId, UpdatePerfilRequest request) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (request.getNome() != null) usuario.setNome(request.getNome());
        if (request.getTelefone() != null) usuario.setTelefone(request.getTelefone());
        if (request.getData_nascimento() != null) usuario.setDataNascimento(request.getData_nascimento());
        if (request.getGenero() != null) usuario.setGenero(request.getGenero());
        if (request.getEndereco() != null) usuario.setEndereco(request.getEndereco());
        if (request.getBio() != null) usuario.setBio(request.getBio());
        
        usuarioRepository.save(usuario);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Perfil atualizado com sucesso");
        return response;
    }
    
    public Map<String, Object> alterarSenha(Integer userId, AlterarSenhaRequest request) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (!passwordEncoder.matches(request.getSenhaAtual(), usuario.getSenhaHash())) {
            throw new RuntimeException("Senha atual incorreta");
        }
        
        String novaSenha = request.getNovaSenha();
        if (novaSenha.length() < 5) {
            throw new RuntimeException("A senha deve ter no mínimo 5 caracteres");
        }
        if (!novaSenha.matches(".*\\d.*")) {
            throw new RuntimeException("A senha deve conter pelo menos 1 número");
        }
        if (!novaSenha.matches(".*[!@#$%^&*(),.?\"':{}|<>].*")) {
            throw new RuntimeException("A senha deve conter pelo menos 1 caractere especial");
        }
        
        usuario.setSenhaHash(passwordEncoder.encode(request.getNovaSenha()));
        usuarioRepository.save(usuario);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Senha alterada com sucesso");
        return response;
    }
    
    public void excluirConta(Integer userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        usuarioRepository.delete(usuario);
    }
}