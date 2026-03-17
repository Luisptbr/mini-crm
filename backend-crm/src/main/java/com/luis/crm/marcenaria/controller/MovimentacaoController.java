package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.dto.MovimentacaoDTO;
import com.luis.crm.marcenaria.model.Movimentacao;
import com.luis.crm.marcenaria.service.MovimentacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/movimentacao")
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    public MovimentacaoController(MovimentacaoService movimentacaoService) {
        this.movimentacaoService = movimentacaoService;
    }

    @PostMapping
    public ResponseEntity<?> registrarRetirada(@RequestBody Movimentacao movimentacao) {
        try {
            Movimentacao salva = movimentacaoService.registrarRetirada(movimentacao);
            return ResponseEntity.ok(salva);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro inesperado: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<MovimentacaoDTO>> listarTodas() {
        return ResponseEntity.ok(movimentacaoService.listarTodos());
    }

    @GetMapping("/funcionario/{nome}")
    public ResponseEntity<List<MovimentacaoDTO>> relatorioFuncionario(@PathVariable String nome) {
        return ResponseEntity.ok(movimentacaoService.relatorioPorFuncionario(nome));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> contarPedidos() {
        return ResponseEntity.ok(movimentacaoService.contarMovimentacoes());
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
