package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.model.Estoque;
import com.luis.crm.marcenaria.service.EstoqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/estoque")
public class EstoqueController {

	private final EstoqueService estoqueService;

	@GetMapping("/usuario/{id}")
	public ResponseEntity<?> listarPorUsuario(@PathVariable UUID id) {
		try {
			List<Estoque> estoque = estoqueService.listarPorUsuario(id);
			return ResponseEntity.ok(estoque);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Erro ao listar estoque: " + e.getMessage());
		}
	}

	public EstoqueController(EstoqueService estoqueService) {
		this.estoqueService = estoqueService;
	}

	@PostMapping
	public ResponseEntity<?> cadastrarItem(@RequestBody Estoque item) {
		try {
			Estoque salvo = estoqueService.cadastrarItem(item);
			return ResponseEntity.ok(salvo);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("Erro inesperado: " + e.getMessage());
		}
	}

	@GetMapping
	public ResponseEntity<?> listarItens() {
		try {
			List<Estoque> itens = estoqueService.listarItens();
			return ResponseEntity.ok(itens);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("Erro ao listar itens: " + e.getMessage());
		}
	}
}
