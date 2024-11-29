package com.polos.luciana.domian;

import com.polos.luciana.domian.dto.request.UsuarioDto;

import java.util.List;

public interface UsuarioService {

    List<UsuarioDto> listar();

    UsuarioDto listarId(int idUsuario);

    UsuarioDto listarUserClave(String nombreUsuario, String Clave);

    UsuarioDto adicionar(UsuarioDto Usuario);

    UsuarioDto editar(UsuarioDto Usuario);

}
