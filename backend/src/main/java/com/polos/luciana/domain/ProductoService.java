package com.polos.luciana.domain;

import com.polos.luciana.domain.dto.request.ProductoDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductoService {

    List<ProductoDto> listar();

    ProductoDto listarId(int idProducto);

    ProductoDto adicionar(ProductoDto Producto, MultipartFile imagen);

    ProductoDto editar(ProductoDto Producto, MultipartFile imagen);

    void eliminar(int idProducto);
}
