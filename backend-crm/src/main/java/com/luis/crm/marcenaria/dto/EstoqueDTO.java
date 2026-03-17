package com.luis.crm.marcenaria.dto;

import java.util.UUID;

public class EstoqueDTO {

	private UUID id;
	private String produto;
	private Integer quantidade;
	private Double precoUnitario;

	public EstoqueDTO() {
	}

	public EstoqueDTO(UUID id, String produto, Integer quantidade, Double precoUnitario) {
		this.id = id;
		this.produto = produto;
		this.quantidade = quantidade;
		this.precoUnitario = precoUnitario;
	}

	// Getters e Setters
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getProduto() {
		return produto;
	}

	public void setProduto(String produto) {
		this.produto = produto;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public Double getPrecoUnitario() {
		return precoUnitario;
	}

	public void setPrecoUnitario(Double precoUnitario) {
		this.precoUnitario = precoUnitario;
	}
}
