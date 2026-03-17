package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.dto.MovimentacaoDTO;
import com.luis.crm.marcenaria.model.Movimentacao;
import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.service.MovimentacaoService;
import com.luis.crm.marcenaria.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/movimentacao")
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;
    private final UsuarioService usuarioService;

    public MovimentacaoController(MovimentacaoService movimentacaoService, UsuarioService usuarioService) {
        this.movimentacaoService = movimentacaoService;
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<?> registrarRetirada(@RequestBody Movimentacao movimentacao, Authentication authentication) {
        Usuario usuario = usuarioService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        movimentacao.setUsuario(usuario);
        Movimentacao salva = movimentacaoService.registrarRetirada(movimentacao);
        return ResponseEntity.ok(salva);
    }

    @GetMapping
    public ResponseEntity<List<MovimentacaoDTO>> listarPorUsuario(Authentication authentication) {
        Usuario usuario = usuarioService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return ResponseEntity.ok(movimentacaoService.listarPorUsuario(usuario.getId()));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> contarPorUsuario(Authentication authentication) {
        Usuario usuario = usuarioService.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return ResponseEntity.ok(movimentacaoService.contarMovimentacoesPorUsuario(usuario.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable UUID id) {
        movimentacaoService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovimentacaoDTO> editar(@PathVariable UUID id,
                                                  @RequestBody MovimentacaoDTO dto) {
        return ResponseEntity.ok(movimentacaoService.editar(id, dto));
    }
}
