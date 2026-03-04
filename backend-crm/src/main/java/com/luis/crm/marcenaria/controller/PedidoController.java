package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.model.Pedido;
import com.luis.crm.marcenaria.service.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    // Cadastro de pedidos vinculado ao cliente do usuário 
    @PostMapping("/{clienteId}")
    public ResponseEntity<?> cadastrar(@PathVariable UUID clienteId, @RequestBody Pedido pedido) {
        try {
            Pedido salvo = pedidoService.salvar(pedido, clienteId);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of(
                    "mensagem", "Pedido criado com sucesso!",
                    "id", salvo.getId()
                )
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("erro", "Cliente não encontrado para vincular o pedido."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("erro", "Erro inesperado ao criar pedido."));
        }
    }

    // Listar pedidos do usuário logado
    @GetMapping
    public ResponseEntity<?> listar() {
        try {
            List<Pedido> pedidos = pedidoService.listar();
            if (pedidos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                                     .body(Map.of("mensagem", "Nenhum pedido encontrado."));
            }
            return ResponseEntity.ok(pedidos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("erro", "Erro ao listar pedidos."));
        }
    }

    // Atualizar pedido
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable UUID id, @RequestBody Pedido pedidoAtualizado) {
        try {
            Pedido atualizado = pedidoService.atualizar(id, pedidoAtualizado);
            return ResponseEntity.ok(
                Map.of(
                    "mensagem", "Pedido atualizado com sucesso!",
                    "id", atualizado.getId()
                )
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erro", "Pedido não encontrado."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("erro", "Erro inesperado ao atualizar pedido."));
        }
    }

    // Deletar pedido
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable UUID id) {
        try {
            pedidoService.deletar(id);
            return ResponseEntity.ok(Map.of("mensagem", "Pedido deletado com sucesso!", "id", id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erro", "Pedido não encontrado."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("erro", "Erro inesperado ao deletar pedido."));
        }
    }
}
