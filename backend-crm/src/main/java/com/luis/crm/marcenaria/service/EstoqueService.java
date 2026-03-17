package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.model.Estoque;
import com.luis.crm.marcenaria.repository.EstoqueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EstoqueService {

    private final EstoqueRepository estoqueRepository;

    public EstoqueService(EstoqueRepository estoqueRepository) {
        this.estoqueRepository = estoqueRepository;
    }

    public List<Estoque> listarPorUsuario(UUID usuarioId) {
        return estoqueRepository.findByUsuarioId(usuarioId);
    }

    public Estoque cadastrarItem(Estoque item) {
        if (item.getQuantidade() == null || item.getQuantidade() < 0) {
            throw new IllegalArgumentException("Quantidade inválida");
        }
        return estoqueRepository.save(item);
    }

    public long contarItensPorUsuario(UUID usuarioId) {
        return estoqueRepository.countByUsuarioId(usuarioId);
    }

    public Estoque atualizarItem(UUID id, Estoque item) {
        Estoque existente = estoqueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item não encontrado"));

        existente.setNome(item.getNome());
        existente.setQuantidade(item.getQuantidade());
        existente.setValorUnitario(item.getValorUnitario());

        return estoqueRepository.save(existente);
    }

    public void deletarItem(UUID id) {
        Estoque existente = estoqueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item não encontrado"));
        estoqueRepository.delete(existente);
    }
}
