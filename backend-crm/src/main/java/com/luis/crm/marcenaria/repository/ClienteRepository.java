package com.luis.crm.marcenaria.repository;

import com.luis.crm.marcenaria.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClienteRepository extends JpaRepository<Cliente, UUID> {
	Optional<Cliente> findByEmail(String email);

	// novos métodos para isolamento
	List<Cliente> findByUsuarioId(UUID usuarioId);

	Optional<Cliente> findByIdAndUsuarioId(UUID id, UUID usuarioId);

	long countByUsuarioId(UUID usuarioId);

}
