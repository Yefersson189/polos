package com.polos.luciana.persistence.repository;

import com.polos.luciana.persistence.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

    Optional<Usuario> findById(int id);

    Optional<Usuario> findByNombreUsuarioAndClave(String nombreUsuario, String clave);
}
