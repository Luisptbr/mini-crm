package com.luis.crm.marcenaria.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Movimentacao implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private UUID id; // UUID gerado automaticamente

	@ManyToOne
	@JoinColumn(name = "item_id")
	private Estoque item;

	// Agora apenas um campo String para registrar o nome
	private String funcionario;

	private Integer quantidadeRetirada;
	private LocalDateTime data;

	// Getters e Setters
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public Estoque getItem() {
		return item;
	}

	public void setItem(Estoque item) {
		this.item = item;
	}

	public String getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(String funcionario) {
		this.funcionario = funcionario;
	}

	public Integer getQuantidadeRetirada() {
		return quantidadeRetirada;
	}

	public void setQuantidadeRetirada(Integer quantidadeRetirada) {
		this.quantidadeRetirada = quantidadeRetirada;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}
}
