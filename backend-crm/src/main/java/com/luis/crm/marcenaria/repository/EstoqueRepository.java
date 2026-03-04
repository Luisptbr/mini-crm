package com.luis.crm.marcenaria.repository;

import com.luis.crm.marcenaria.model.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.List;


public interface EstoqueRepository extends JpaRepository<Estoque, UUID> {
	List<Estoque> findByUsuarioId(UUID usuarioId);
}
