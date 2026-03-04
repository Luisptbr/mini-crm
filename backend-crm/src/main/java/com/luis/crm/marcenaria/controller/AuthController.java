package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.security.JwtUtil;
import com.luis.crm.marcenaria.service.UsuarioService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager,
                          UsuarioService usuarioService,
                          JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) {
        return usuarioService.salvar(usuario);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Usuario usuario) {
        // autentica email + senha
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getSenha())
        );

        // busca usuário real do banco
        Usuario usuarioBanco = usuarioService
                .findByEmail(usuario.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        // gera token JWT com claims corretos
        String token = jwtUtil.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(usuarioBanco.getEmail())
                        .password(usuarioBanco.getSenha())
                        .authorities("ROLE_" + usuarioBanco.getRole().name())
                        .build()
        );

        return Map.of("token", token);
    }
}
