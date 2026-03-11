package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.dto.RelatorioDTO;
import com.luis.crm.marcenaria.service.RelatorioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RelatorioController {

    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping("/relatorios")
    public RelatorioDTO getRelatorio() {
        return relatorioService.gerarRelatorio();
    }
}
