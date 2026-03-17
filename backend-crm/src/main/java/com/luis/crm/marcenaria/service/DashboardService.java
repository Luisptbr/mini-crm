package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.dto.DashboardDTO;
import com.luis.crm.marcenaria.repository.ClienteRepository;
import com.luis.crm.marcenaria.repository.PedidoRepository;
import com.luis.crm.marcenaria.repository.EstoqueRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DashboardService {

    private final ClienteRepository clienteRepository;
    private final PedidoRepository pedidoRepository;
    private final EstoqueRepository estoqueRepository;

    public DashboardService(ClienteRepository clienteRepository,
                            PedidoRepository pedidoRepository,
                            EstoqueRepository estoqueRepository) {
        this.clienteRepository = clienteRepository;
        this.pedidoRepository = pedidoRepository;
        this.estoqueRepository = estoqueRepository;
    }

    public DashboardDTO getDashboardData(UUID usuarioId) {
        long totalClientes = clienteRepository.findByUsuarioId(usuarioId).size();
        long totalPedidos = pedidoRepository.findByUsuarioId(usuarioId).size();
        long totalEstoque = estoqueRepository.findByUsuarioId(usuarioId).size();

        return new DashboardDTO(totalClientes, totalPedidos, totalEstoque);
    }
}
