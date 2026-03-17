package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.dto.RelatorioDTO;
import com.luis.crm.marcenaria.model.Pedido;
import com.luis.crm.marcenaria.model.Estoque;
import com.luis.crm.marcenaria.repository.ClienteRepository;
import com.luis.crm.marcenaria.repository.PedidoRepository;
import com.luis.crm.marcenaria.repository.EstoqueRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    private final ClienteRepository clienteRepo;
    private final PedidoRepository pedidoRepo;
    private final EstoqueRepository estoqueRepo;

    public RelatorioService(ClienteRepository clienteRepo,
                            PedidoRepository pedidoRepo,
                            EstoqueRepository estoqueRepo) {
        this.clienteRepo = clienteRepo;
        this.pedidoRepo = pedidoRepo;
        this.estoqueRepo = estoqueRepo;
    }

    public RelatorioDTO gerarRelatorioPorUsuario(UUID usuarioId) {
        RelatorioDTO dto = new RelatorioDTO();

        dto.setClientes(clienteRepo.countByUsuarioId(usuarioId));
        dto.setPedidos(pedidoRepo.countByUsuarioId(usuarioId));
        dto.setEstoque(estoqueRepo.countByUsuarioId(usuarioId));

        dto.setFaturamentoRealizado(calcularFaturamentoRealizadoPorUsuario(usuarioId));
        dto.setFaturamentoPrevisto(calcularFaturamentoPrevistoPorUsuario(usuarioId));
        dto.setCustoEstoque(calcularCustoEstoquePorUsuario(usuarioId));
        dto.setPedidosPorStatus(gerarPedidosPorStatusPorUsuario(usuarioId));

        return dto;
    }

    private double calcularFaturamentoRealizadoPorUsuario(UUID usuarioId) {
        return pedidoRepo.findByStatusAndUsuarioId("Finalizado", usuarioId)
                .stream()
                .map(Pedido::getValor)
                .filter(this::valorValido)
                .mapToDouble(BigDecimal::doubleValue)
                .sum();
    }

    private double calcularFaturamentoPrevistoPorUsuario(UUID usuarioId) {
        return pedidoRepo.findByStatusInAndUsuarioId(
                        List.of("Aprovado", "Em Produção", "Instalação"), usuarioId)
                .stream()
                .map(Pedido::getValor)
                .filter(this::valorValido)
                .mapToDouble(BigDecimal::doubleValue)
                .sum();
    }

    private double calcularCustoEstoquePorUsuario(UUID usuarioId) {
        return estoqueRepo.findByUsuarioId(usuarioId)
                .stream()
                .mapToDouble(e -> {
                    if (e.getValorUnitario() == null || e.getQuantidade() == null) return 0.0;
                    return e.getQuantidade() * e.getValorUnitario();
                })
                .sum();
    }

    private List<RelatorioDTO.PedidosPorStatus> gerarPedidosPorStatusPorUsuario(UUID usuarioId) {
        return pedidoRepo.findByUsuarioId(usuarioId)
                .stream()
                .collect(Collectors.groupingBy(Pedido::getStatus, Collectors.counting()))
                .entrySet()
                .stream()
                .map(entry -> {
                    RelatorioDTO.PedidosPorStatus ps = new RelatorioDTO.PedidosPorStatus();
                    ps.setStatus(entry.getKey());
                    ps.setTotal(entry.getValue());
                    return ps;
                })
                .collect(Collectors.toList());
    }

    private boolean valorValido(BigDecimal valor) {
        return valor != null && valor.compareTo(BigDecimal.ZERO) >= 0;
    }
}
