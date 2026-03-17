package com.luis.crm.marcenaria.dto;

public class DashboardDTO {
    private final long totalClientes;
    private final long totalPedidos;
    private final long totalEstoque;

    public DashboardDTO(long totalClientes, long totalPedidos, long totalEstoque) {
        this.totalClientes = totalClientes;
        this.totalPedidos = totalPedidos;
        this.totalEstoque = totalEstoque;
    }

    public long getTotalClientes() { return totalClientes; }
    public long getTotalPedidos() { return totalPedidos; }
    public long getTotalEstoque() { return totalEstoque; }
}
