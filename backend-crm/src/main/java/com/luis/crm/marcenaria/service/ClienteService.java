package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.model.Cliente;
import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.repository.ClienteRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClienteService {

	private final ClienteRepository clienteRepository;

	public ClienteService(ClienteRepository clienteRepository) {
		this.clienteRepository = clienteRepository;
	}

	public Cliente salvar(Cliente cliente) {
		clienteRepository.findByEmail(cliente.getEmail()).ifPresent(c -> {
			throw new IllegalArgumentException("Email já cadastrado!");
		});

		if (!cliente.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
			throw new IllegalArgumentException("Formato de email inválido!");
		}

		cliente.setUsuario(usuarioLogado());
		return clienteRepository.save(cliente);
	}

	public List<Cliente> listar() {
		UUID usuarioId = usuarioLogado().getId();
		return clienteRepository.findByUsuarioId(usuarioId);
	}

	public Cliente atualizar(UUID id, Cliente cliente) {
		UUID usuarioId = usuarioLogado().getId();
		Cliente existente = clienteRepository.findByIdAndUsuarioId(id, usuarioId)
				.orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado ou não pertence ao usuário"));

		existente.setNome(cliente.getNome());
		existente.setTelefone(cliente.getTelefone());
		existente.setEmail(cliente.getEmail());

		return clienteRepository.save(existente);
	}

	public void deletar(UUID id) {
		UUID usuarioId = usuarioLogado().getId();
		Cliente existente = clienteRepository.findByIdAndUsuarioId(id, usuarioId)
				.orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado ou não pertence ao usuário"));
		clienteRepository.delete(existente);
	}

	public long contarClientes() {
		return clienteRepository.count();
	}

	private Usuario usuarioLogado() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return (Usuario) auth.getPrincipal();
	}

}
