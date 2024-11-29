package com.polos.luciana.domian.impl;

import com.polos.luciana.domian.UsuarioService;
import com.polos.luciana.domian.dto.request.UsuarioDto;
import com.polos.luciana.exception.BusinessException;
import com.polos.luciana.persistence.entity.Usuario;
import com.polos.luciana.persistence.mappers.UsuarioMapper;
import com.polos.luciana.persistence.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

import static com.polos.luciana.util.constant.Constant.RESPONSE_REQUEST_ERROR;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioMapper usuarioMapper;

    @Override
    public List<UsuarioDto> listar() {

        List<Usuario> usuariosList = usuarioRepository.findAll();

        if (usuariosList.isEmpty()) {
            throw new BusinessException(
                    String.valueOf(HttpStatus.NO_CONTENT.value()), HttpStatus.NO_CONTENT.getReasonPhrase());
        }

        return usuarioMapper.toDtoList(usuariosList);
    }

    @Override
    public UsuarioDto listarId(int idUsuario) {

        try {
            return usuarioMapper.toDto(usuarioRepository.findById(idUsuario).get());
        }
        catch (NoSuchElementException exception){
            throw new BusinessException(
                    String.valueOf(HttpStatus.NO_CONTENT.value()), HttpStatus.NO_CONTENT.getReasonPhrase());
        }
    }

    @Override
    public UsuarioDto listarUserClave(String nombreUsuario, String clave) {

        try {
            return usuarioMapper.toDto(usuarioRepository.findByNombreUsuarioAndClave(nombreUsuario, clave).get());
        }
        catch (NoSuchElementException exception){
            throw new BusinessException(
                    String.valueOf(HttpStatus.NO_CONTENT.value()), HttpStatus.NO_CONTENT.getReasonPhrase());
        }
    }

    @Override
    public UsuarioDto adicionar(UsuarioDto usuarioDto) {

        Usuario usuario = usuarioMapper.toEntity(usuarioDto);

        return usuarioMapper.toDto(usuarioRepository.save(usuario));
    }

    @Override
    public UsuarioDto editar(UsuarioDto usuarioDto) {

        try {

            if (Objects.isNull(usuarioDto.getId())) {
                throw new BusinessException(
                        String.valueOf(HttpStatus.BAD_REQUEST.value()), RESPONSE_REQUEST_ERROR);
            }

            Usuario usuarioActual = usuarioRepository.findById(usuarioDto.getId()).get();

            usuarioActual.setNombreCompleto(usuarioDto.getNombreCompleto());
            usuarioActual.setNombreUsuario(usuarioDto.getNombreUsuario());
            usuarioActual.setClave(usuarioDto.getClave());
            usuarioActual.setCorreo(usuarioDto.getCorreo());
            usuarioActual.setCelular(usuarioDto.getCelular());
            usuarioActual.setDireccion(usuarioDto.getDireccion());
            usuarioActual.setEstado(usuarioDto.isEstado());

            return usuarioMapper.toDto(usuarioRepository.save(usuarioActual));
        }
        catch (NoSuchElementException exception){
            throw new BusinessException(
                    String.valueOf(HttpStatus.NO_CONTENT.value()), HttpStatus.NO_CONTENT.getReasonPhrase());
        }
    }
}
