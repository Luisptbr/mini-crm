package com.luis.crm.marcenaria.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class MovimentacaoDTO {
	private UUID id;
	private String produto;
	private Integer quantidade;
	private String data;
	private String funcionario;

	public MovimentacaoDTO(UUID id, String produto, Integer quantidade, LocalDate data, String funcionario) {
		this.id = id;
		this.produto = produto;
		this.quantidade = quantidade;
		this.data = data != null ? data.format(DateTimeFormatter.ofPattern("dd/MM/yy")) : null;
		this.funcionario = funcionario;
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

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(String funcionario) {
		this.funcionario = funcionario;
	}
}
