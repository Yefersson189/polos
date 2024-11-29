package com.polos.luciana.domain.impl;

import com.polos.luciana.domain.ProductoService;
import com.polos.luciana.domain.dto.request.ProductoDto;
import com.polos.luciana.exception.BusinessException;
import com.polos.luciana.persistence.entity.Producto;
import com.polos.luciana.persistence.mappers.ProductoMapper;
import com.polos.luciana.persistence.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

import static com.polos.luciana.util.constant.Constant.RESPONSE_REQUEST_ERROR;

@Service
public class ProductoServiceImpl implements ProductoService {
    
    @Autowired
    ProductoRepository productoRepository;

    @Autowired
    ProductoMapper productoMapper;

    @Override
    public List<ProductoDto> listar() {

        List<Producto> productosList = productoRepository.findAll();

        if (productosList.isEmpty()) {
            throw new BusinessException(
                    String.valueOf(HttpStatus.NO_CONTENT.value()), HttpStatus.NO_CONTENT.getReasonPhrase());
        }

        return productoMapper.toDtoList(productosList);
    }

    @Override
    public ProductoDto listarId(int idProducto) {

        try {
            return productoMapper.toDto(productoRepository.findById(idProducto).get());
        }
        catch (NoSuchElementException exception){
            throw new BusinessException(
                    String.valueOf(HttpStatus.NO_CONTENT.value()), HttpStatus.NO_CONTENT.getReasonPhrase());
        }
    }

    @Override
    public ProductoDto adicionar(ProductoDto productoDto) {

        Producto producto = productoMapper.toEntity(productoDto);

        return productoMapper.toDto(productoRepository.save(producto));
    }

    @Override
    public ProductoDto editar(ProductoDto productoDto) {

        try {

            if (Objects.isNull(productoDto.getId())) {
                throw new BusinessException(
                        String.valueOf(HttpStatus.BAD_REQUEST.value()), RESPONSE_REQUEST_ERROR);
            }

            Producto productoActual = productoRepository.findById(productoDto.getId()).get();

            productoActual.setNombre(productoDto.getNombre());
            productoActual.setTalla(productoDto.getTalla());
            productoActual.setPrecio(productoDto.getPrecio());
            productoActual.setImagen(productoDto.getImagen());
            productoActual.setEstado(productoDto.isEstado());

            return productoMapper.toDto(productoRepository.save(productoActual));
        }
        catch (NoSuchElementException exception){
            throw new BusinessException(
                    String.valueOf(HttpStatus.NO_CONTENT.value()), HttpStatus.NO_CONTENT.getReasonPhrase());
        }
    }

    @Override
    public void eliminar(int idProducto) {

        if(!productoRepository.existsById(idProducto)) {
            throw new BusinessException(
                    String.valueOf(HttpStatus.NO_CONTENT.value()), HttpStatus.NO_CONTENT.getReasonPhrase());
        }
        productoRepository.deleteById(idProducto);
    }
}
