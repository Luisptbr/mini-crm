package com.luis.crm.marcenaria.controller;

import com.luis.crm.marcenaria.dto.DashboardDTO;
import com.luis.crm.marcenaria.model.Usuario;
import com.luis.crm.marcenaria.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardDTO> getDashboard(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        UUID usuarioId = usuario.getId();

        DashboardDTO dto = dashboardService.getDashboardData(usuarioId);
        return ResponseEntity.ok(dto);
    }
}
