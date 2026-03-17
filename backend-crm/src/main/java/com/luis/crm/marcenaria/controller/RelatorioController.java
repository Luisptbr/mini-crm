package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.dto.RelatorioDTO;
import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.service.RelatorioService;
import com.luis.crm.marcenaria.service.UsuarioService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RelatorioController {

    private final RelatorioService relatorioService;
    private final UsuarioService usuarioService;

    public RelatorioController(RelatorioService relatorioService, UsuarioService usuarioService) {
        this.relatorioService = relatorioService;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/relatorios")
    public RelatorioDTO getRelatorio(Authentication authentication) {
        Usuario usuario = usuarioService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return relatorioService.gerarRelatorioPorUsuario(usuario.getId());
    }
}
