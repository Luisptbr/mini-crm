package com.luis.crm.marcenaria.dto;

import java.util.List;

public class RelatorioDTO {

	private long clientes;
	private long pedidos;
	private long estoque;

	private double faturamentoRealizado;
	private double faturamentoPrevisto;
	private double custoEstoque;

	private List<PedidosPorStatus> pedidosPorStatus;

	// Getters e Setters
	public long getClientes() {
		return clientes;
	}

	public void setClientes(long clientes) {
		this.clientes = clientes;
	}

	public long getPedidos() {
		return pedidos;
	}

	public void setPedidos(long pedidos) {
		this.pedidos = pedidos;
	}

	public long getEstoque() {
		return estoque;
	}

	public void setEstoque(long estoque) {
		this.estoque = estoque;
	}

	public double getFaturamentoRealizado() {
		return faturamentoRealizado;
	}

	public void setFaturamentoRealizado(double faturamentoRealizado) {
		this.faturamentoRealizado = faturamentoRealizado;
	}

	public double getFaturamentoPrevisto() {
		return faturamentoPrevisto;
	}

	public void setFaturamentoPrevisto(double faturamentoPrevisto) {
		this.faturamentoPrevisto = faturamentoPrevisto;
	}

	public double getCustoEstoque() {
		return custoEstoque;
	}

	public void setCustoEstoque(double custoEstoque) {
		this.custoEstoque = custoEstoque;
	}

	public List<PedidosPorStatus> getPedidosPorStatus() {
		return pedidosPorStatus;
	}

	public void setPedidosPorStatus(List<PedidosPorStatus> pedidosPorStatus) {
		this.pedidosPorStatus = pedidosPorStatus;
	}

	// Classe interna
	public static class PedidosPorStatus {
		private String status;
		private long total;

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public long getTotal() {
			return total;
		}

		public void setTotal(long total) {
			this.total = total;
		}
	}
}
