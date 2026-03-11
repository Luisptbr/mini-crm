package com.luis.crm.marcenaria.dto;

import java.time.LocalDate;

public class MovimentacaoDTO {
	private Long id;
	private String tipo; // ENTRADA ou SAIDA
	private String produto;
	private Integer quantidade;
	private LocalDate data;

	// getters e setters
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipo() {
		return this.tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getProduto() {
		return this.produto;
	}

	public void setProduto(String produto) {
		this.produto = produto;
	}

	public Integer getQuantidade() {
		return this.quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public LocalDate getData() {
		return this.data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

}
