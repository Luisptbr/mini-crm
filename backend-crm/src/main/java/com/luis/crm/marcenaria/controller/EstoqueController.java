package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.model.Estoque;
import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.service.EstoqueService;
import com.luis.crm.marcenaria.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/estoque")
public class EstoqueController {

    private final EstoqueService estoqueService;
    private final UsuarioService usuarioService;

    public EstoqueController(EstoqueService estoqueService, UsuarioService usuarioService) {
        this.estoqueService = estoqueService;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<?> listarItens(Authentication authentication) {
        try {
            Usuario usuario = usuarioService.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            List<Estoque> itens = estoqueService.listarPorUsuario(usuario.getId());
            return ResponseEntity.ok(itens);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao listar itens: " + e.getMessage());
        }
    }

    @GetMapping("/count")
    public ResponseEntity<?> contarItens(Authentication authentication) {
        try {
            Usuario usuario = usuarioService.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            long total = estoqueService.contarItensPorUsuario(usuario.getId());
            return ResponseEntity.ok(total);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao contar itens: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrarItem(@RequestBody Estoque item, Authentication authentication) {
        try {
            Usuario usuario = usuarioService.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            item.setUsuario(usuario);
            Estoque salvo = estoqueService.cadastrarItem(item);
            return ResponseEntity.ok(salvo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao cadastrar item: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarItem(@PathVariable UUID id, @RequestBody Estoque item) {
        try {
            Estoque atualizado = estoqueService.atualizarItem(id, item);
            return ResponseEntity.ok(atualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao atualizar item: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarItem(@PathVariable UUID id) {
        try {
            estoqueService.deletarItem(id);
            return ResponseEntity.ok("Item deletado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao deletar item: " + e.getMessage());
        }
    }
}
