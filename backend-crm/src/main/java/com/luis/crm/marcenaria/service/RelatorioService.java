package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.dto.RelatorioDTO;
import com.luis.crm.marcenaria.dto.RelatorioDTO.PedidosPorStatus;
import com.luis.crm.marcenaria.model.Pedido;
import com.luis.crm.marcenaria.model.Estoque;
import com.luis.crm.marcenaria.repository.ClienteRepository;
import com.luis.crm.marcenaria.repository.PedidoRepository;
import com.luis.crm.marcenaria.repository.EstoqueRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

		dto.setFaturamentoRealizado(calcularFaturamentoRealizado());
		dto.setFaturamentoPrevisto(calcularFaturamentoPrevisto());
		dto.setCustoEstoque(calcularCustoEstoque());
		dto.setPedidosPorStatus(gerarPedidosPorStatus());

		return dto;
	}

	// ---------------- Métodos auxiliares ---------------- //

	private double calcularFaturamentoRealizado() {
		return pedidoRepo.findByStatus("Finalizado").stream().map(Pedido::getValor).filter(this::valorValido)
				.mapToDouble(BigDecimal::doubleValue).sum();
	}

	private double calcularFaturamentoPrevisto() {
		return pedidoRepo.findByStatusIn(List.of("Aprovado", "Em Produção", "Instalação")).stream()
				.map(Pedido::getValor).filter(this::valorValido).mapToDouble(BigDecimal::doubleValue).sum();
	}

	private double calcularCustoEstoque() {
		return estoqueRepo.findAll().stream().mapToDouble(this::calcularCustoItemEstoque).sum();
	}

	private double calcularCustoItemEstoque(Estoque e) {
		if (e.getValorUnitario() == null || e.getQuantidade() == null)
			return 0.0;
		return e.getQuantidade() * e.getValorUnitario();
	}

	private List<PedidosPorStatus> gerarPedidosPorStatus() {
		return pedidoRepo.findAll().stream().collect(Collectors.groupingBy(Pedido::getStatus, Collectors.counting()))
				.entrySet().stream().map(entry -> {
					PedidosPorStatus ps = new PedidosPorStatus();
					ps.setStatus(entry.getKey());
					ps.setTotal(entry.getValue());
					return ps;
				}).collect(Collectors.toList());
	}

	private boolean valorValido(BigDecimal valor) {
		return valor != null && valor.compareTo(BigDecimal.ZERO) >= 0;
	}
}
