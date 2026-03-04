package com.luis.crm.marcenaria.repository;

import com.luis.crm.marcenaria.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PedidoRepository extends JpaRepository<Pedido, UUID> {
    // novos métodos para isolamento
    List<Pedido> findByUsuarioId(UUID usuarioId);
    Optional<Pedido> findByIdAndUsuarioId(UUID id, UUID usuarioId);
}
