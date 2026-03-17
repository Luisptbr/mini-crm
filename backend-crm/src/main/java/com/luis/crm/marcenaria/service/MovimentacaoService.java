package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.dto.MovimentacaoDTO;
import com.luis.crm.marcenaria.model.Estoque;
import com.luis.crm.marcenaria.model.Movimentacao;
import com.luis.crm.marcenaria.repository.EstoqueRepository;
import com.luis.crm.marcenaria.repository.MovimentacaoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final EstoqueRepository estoqueRepository;

    public MovimentacaoService(MovimentacaoRepository movimentacaoRepository,
                               EstoqueRepository estoqueRepository) {
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
        return movimentacaoRepository.save(movimentacao);
    }

    public long contarMovimentacoes() {
        return movimentacaoRepository.count();
    }

    public List<MovimentacaoDTO> listarTodos() {
        return movimentacaoRepository.findAll()
                .stream()
                .map(m -> new MovimentacaoDTO(
                        m.getId(),
                        m.getItem().getNome(),
                        m.getQuantidadeRetirada(),
                        m.getData().toLocalDate(),
                        m.getFuncionario()
                ))
                .collect(Collectors.toList());
    }

    public List<MovimentacaoDTO> relatorioPorFuncionario(String funcionario) {
        return movimentacaoRepository.findByFuncionario(funcionario)
                .stream()
                .map(m -> new MovimentacaoDTO(
                        m.getId(),
                        m.getItem().getNome(),
                        m.getQuantidadeRetirada(),
                        m.getData().toLocalDate(),
                        m.getFuncionario()
                ))
                .collect(Collectors.toList());
    }

    public void excluir(UUID id) {
        movimentacaoRepository.deleteById(id);
    }

    public MovimentacaoDTO editar(UUID id, MovimentacaoDTO dto) {
        Movimentacao mov = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movimentação não encontrada"));

        mov.setFuncionario(dto.getFuncionario());
        mov.setQuantidadeRetirada(dto.getQuantidade());

        movimentacaoRepository.save(mov);

        return new MovimentacaoDTO(
                mov.getId(),
                mov.getItem().getNome(),
                mov.getQuantidadeRetirada(),
                mov.getData().toLocalDate(),
                mov.getFuncionario()
        );
    }
}
