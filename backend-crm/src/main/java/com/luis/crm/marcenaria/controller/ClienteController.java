package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.model.Cliente;
import com.luis.crm.marcenaria.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

	private final ClienteService clienteService;

	public ClienteController(ClienteService clienteService) {
		this.clienteService = clienteService;
	}

	// Cadastro de cliente
	@PostMapping
	public ResponseEntity<?> salvar(@RequestBody Cliente cliente) {
		try {
			Cliente salvo = clienteService.salvar(cliente);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(Map.of("mensagem", "Cliente criado com sucesso!", "id", salvo.getId()));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("erro", "Erro ao criar cliente."));
		}
	}

	// Listagem de clientes
	@GetMapping
	public ResponseEntity<?> listar() {
		List<Cliente> clientes = clienteService.listar();
		return ResponseEntity.ok(clientes);
	}

	// Atualização de cliente
	@PutMapping("/{id}")
	public ResponseEntity<?> atualizar(@PathVariable UUID id, @RequestBody Cliente cliente) {
		try {
			Cliente atualizado = clienteService.atualizar(id, cliente);
			return ResponseEntity.ok(Map.of("mensagem", "Cliente atualizado com sucesso!", "id", atualizado.getId()));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erro", "Cliente não encontrado."));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("erro", "Erro ao atualizar cliente."));
		}
	}

	// Exclusão de cliente
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletar(@PathVariable UUID id) {
		try {
			clienteService.deletar(id);
			return ResponseEntity.ok(Map.of("mensagem", "Cliente deletado com sucesso!", "id", id));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erro", "Cliente não encontrado."));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("erro", "Erro ao deletar cliente."));
		}
	}

	@GetMapping("/count")
	public ResponseEntity<?> contarClientes() {
		try {
			long total = clienteService.contarClientes();
			return ResponseEntity.ok(total);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("Erro ao contar clientes: " + e.getMessage());
		}
	}

}
