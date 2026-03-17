package com.luis.crm.marcenaria.repository;

import com.luis.crm.marcenaria.model.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EstoqueRepository extends JpaRepository<Estoque, UUID> {
	List<Estoque> findByUsuarioId(UUID usuarioId);

	long countByUsuarioId(UUID usuarioId);
}
