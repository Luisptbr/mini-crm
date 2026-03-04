package com.luis.crm.marcenaria.service;

import com.luis.crm.marcenaria.model.Cliente;
import com.luis.crm.marcenaria.model.Pedido;
import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.repository.ClienteRepository;
import com.luis.crm.marcenaria.repository.PedidoRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;

    public PedidoService(PedidoRepository pedidoRepository, ClienteRepository clienteRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
    }

    // Criar pedido vinculado a cliente do usuário logado
    public Pedido salvar(Pedido pedido, UUID clienteId) {
        UUID usuarioId = usuarioLogado().getId();
        Cliente cliente = clienteRepository.findByIdAndUsuarioId(clienteId, usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado ou não pertence ao usuário"));

        if (pedido.getValor() == null || pedido.getValor().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor do pedido deve ser positivo");
        }

        pedido.setCliente(cliente);
        pedido.setUsuario(cliente.getUsuario());
        return pedidoRepository.save(pedido);
    }

    // Listar pedidos do usuário logado
    public List<Pedido> listar() {
        UUID usuarioId = usuarioLogado().getId();
        return pedidoRepository.findByUsuarioId(usuarioId);
    }

    // Atualizar pedido
    public Pedido atualizar(UUID id, Pedido pedidoAtualizado) {
        UUID usuarioId = usuarioLogado().getId();
        Pedido pedidoExistente = pedidoRepository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado ou não pertence ao usuário"));

        if (pedidoAtualizado.getValor() == null || pedidoAtualizado.getValor().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor do pedido deve ser positivo");
        }

        pedidoExistente.setDescricao(pedidoAtualizado.getDescricao());
        pedidoExistente.setValor(pedidoAtualizado.getValor());

        return pedidoRepository.save(pedidoExistente);
    }

    // Deletar pedido
    public void deletar(UUID id) {
        UUID usuarioId = usuarioLogado().getId();
        Pedido pedido = pedidoRepository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado ou não pertence ao usuário"));

        pedidoRepository.delete(pedido);
    }

    // Recupera o usuário logado
    private Usuario usuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) auth.getPrincipal();
    }
}
