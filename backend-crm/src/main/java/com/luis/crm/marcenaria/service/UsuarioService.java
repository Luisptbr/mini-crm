package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.model.Role;
import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario salvar(Usuario usuario) {
        // Verifica duplicidade de email
        usuarioRepository.findByEmail(usuario.getEmail())
            .ifPresent(u -> {
                throw new IllegalArgumentException("Email já cadastrado!");
            });

        // Valida formato do email
        if (!usuario.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Formato de email inválido!");
        }

        // Valida senha
        if (!isSenhaValida(usuario.getSenha())) {
            throw new IllegalArgumentException("Senha não atende aos requisitos de segurança!");
        }

        // Criptografa senha
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

        // Define role automaticamente como USER
        usuario.setRole(Role.USER);

        return usuarioRepository.save(usuario);
    }

    private boolean isSenhaValida(String senha) {
        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$";
        return senha.matches(regex);
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }
    
    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + email));
    }
}
