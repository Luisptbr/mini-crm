package com.luis.crm.marcenaria.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luis.crm.marcenaria.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
	Optional<Usuario> findByEmail(String email);
}
