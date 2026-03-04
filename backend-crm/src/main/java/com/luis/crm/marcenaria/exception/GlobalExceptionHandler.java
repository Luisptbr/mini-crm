package com.luis.crm.marcenaria.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(UsuarioException.class)
	public ResponseEntity<Map<String, String>> handleUsuarioNaoEncontrado(UsuarioException ex) {
		Map<String, String> erro = new HashMap<>();
		erro.put("erro", ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
	}

	@ExceptionHandler(PedidoException.class)
	public ResponseEntity<Map<String, String>> handlePedidoNaoEncontrado(PedidoException ex) {
		Map<String, String> erro = new HashMap<>();
		erro.put("erro", ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
	}

	@ExceptionHandler(ClienteException.class)
	public ResponseEntity<Map<String, String>> handleClienteNaoEncontrado(ClienteException ex) {
		Map<String, String> erro = new HashMap<>();
		erro.put("erro", ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
	}

	@ExceptionHandler(IllegalAccessException.class)
	public ResponseEntity<Map<String, String>> handleAcessoNegado(IllegalAccessException ex) {
		Map<String, String> erro = new HashMap<>();
		erro.put("erro", "Acesso negado: " + ex.getMessage());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, String>> handleGeneric(Exception ex) {
		Map<String, String> erro = new HashMap<>();
		erro.put("erro", "Erro interno no servidor");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
	}
}
