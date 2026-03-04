package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.model.Movimentacao;
import com.luis.crm.marcenaria.service.MovimentacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> listarTodas() {
        try {
            List<Movimentacao> movimentacoes = movimentacaoService.listarTodos();
            return ResponseEntity.ok(movimentacoes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao listar movimentações: " + e.getMessage());
        }
    }

    @GetMapping("/funcionario/{nome}")
    public ResponseEntity<?> relatorioFuncionario(@PathVariable String nome) {
        try {
            List<Movimentacao> relatorio = movimentacaoService.relatorioPorFuncionario(nome);
            return ResponseEntity.ok(relatorio);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao gerar relatório: " + e.getMessage());
        }
    }
}
