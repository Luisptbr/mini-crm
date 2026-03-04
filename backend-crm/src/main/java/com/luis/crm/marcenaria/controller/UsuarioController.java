package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.service.UsuarioService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listar();
    }
}
