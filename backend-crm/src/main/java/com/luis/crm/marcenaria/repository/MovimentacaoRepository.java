package com.luis.crm.marcenaria.repository;

import com.luis.crm.marcenaria.model.Movimentacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, UUID> {
    List<Movimentacao> findByFuncionario(String funcionario);
}

