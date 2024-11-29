package com.polos.luciana.persistence.mappers;

import org.mapstruct.Mapper;

import com.polos.luciana.domain.dto.request.UsuarioDto;
import com.polos.luciana.persistence.entity.Usuario;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

	Usuario toEntity(UsuarioDto usuarioDto);
	
	UsuarioDto toDto(Usuario usuario);

	List<UsuarioDto>toDtoList(List<Usuario> UsuarioList);
}

