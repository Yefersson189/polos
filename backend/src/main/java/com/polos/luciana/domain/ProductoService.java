package com.polos.luciana.domain;

import com.polos.luciana.domain.dto.request.ProductoDto;

import java.util.List;

public interface ProductoService {

    List<ProductoDto> listar();

    ProductoDto listarId(int idProducto);

    ProductoDto adicionar(ProductoDto Producto);

    ProductoDto editar(ProductoDto Producto);

    void eliminar(int idProducto);
}
