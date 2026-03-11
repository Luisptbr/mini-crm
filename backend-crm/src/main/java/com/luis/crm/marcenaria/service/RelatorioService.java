package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.dto.RelatorioDTO;
import com.luis.crm.marcenaria.dto.RelatorioDTO.PedidosPorStatus;
import com.luis.crm.marcenaria.repository.ClienteRepository;
import com.luis.crm.marcenaria.repository.PedidoRepository;
import com.luis.crm.marcenaria.repository.EstoqueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    private final ClienteRepository clienteRepo;
    private final PedidoRepository pedidoRepo;
    private final EstoqueRepository estoqueRepo;

    public RelatorioService(ClienteRepository clienteRepo, PedidoRepository pedidoRepo, EstoqueRepository estoqueRepo) {
        this.clienteRepo = clienteRepo;
        this.pedidoRepo = pedidoRepo;
        this.estoqueRepo = estoqueRepo;
    }

    public RelatorioDTO gerarRelatorio() {
        RelatorioDTO dto = new RelatorioDTO();
        dto.setClientes(clienteRepo.count());
        dto.setPedidos(pedidoRepo.count());
        dto.setEstoque(estoqueRepo.count());

        List<PedidosPorStatus> pedidosPorStatus = pedidoRepo.findAll()
            .stream()
            .collect(Collectors.groupingBy(p -> p.getStatus(), Collectors.counting()))
            .entrySet()
            .stream()
            .map(e -> {
                PedidosPorStatus ps = new PedidosPorStatus();
                ps.setStatus(e.getKey());
                ps.setTotal(e.getValue());
                return ps;
            })
            .collect(Collectors.toList());

        dto.setPedidosPorStatus(pedidosPorStatus);

        return dto;
    }
}
