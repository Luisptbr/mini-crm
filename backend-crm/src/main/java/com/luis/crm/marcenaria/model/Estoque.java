package com.luis.crm.marcenaria.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
public class Estoque implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private UUID id; 

	private String nome;
	private Integer quantidade;

	@Column(nullable = true)
	private Double valorUnitario; 

	@ManyToOne(optional = true)
	@JoinColumn(name = "usuario_id", nullable = false)
	private Usuario usuario;

	// Getters e Setters
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public Double getValorUnitario() {
		return valorUnitario;
	}

	public void setValorUnitario(Double valorUnitario) {
		this.valorUnitario = valorUnitario;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}
