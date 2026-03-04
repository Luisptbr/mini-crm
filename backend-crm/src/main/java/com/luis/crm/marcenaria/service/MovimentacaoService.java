package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.model.Estoque;
import com.luis.crm.marcenaria.model.Movimentacao;
import com.luis.crm.marcenaria.repository.EstoqueRepository;
import com.luis.crm.marcenaria.repository.MovimentacaoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final EstoqueRepository estoqueRepository;

    public MovimentacaoService(MovimentacaoRepository movimentacaoRepository, EstoqueRepository estoqueRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
        this.estoqueRepository = estoqueRepository;
    }

    public Movimentacao registrarRetirada(Movimentacao movimentacao) {
        Estoque item = estoqueRepository.findById(movimentacao.getItem().getId())
                .orElseThrow(() -> new IllegalArgumentException("Item não encontrado"));

        if (item.getQuantidade() < movimentacao.getQuantidadeRetirada()) {
            throw new IllegalArgumentException("Quantidade insuficiente em estoque");
        }

        item.setQuantidade(item.getQuantidade() - movimentacao.getQuantidadeRetirada());
        estoqueRepository.save(item);

        movimentacao.setData(LocalDateTime.now());
        Movimentacao salva = movimentacaoRepository.save(movimentacao);

        if (item.getQuantidade() == 1) {
            System.out.println("⚠️ Alerta: Estoque baixo para o item " + item.getNome());
        }

        return salva;
    }

    public List<Movimentacao> listarTodos() {
        return movimentacaoRepository.findAll();
    }

    public List<Movimentacao> relatorioPorFuncionario(String funcionario) {
        return movimentacaoRepository.findByFuncionario(funcionario);
    }
}
