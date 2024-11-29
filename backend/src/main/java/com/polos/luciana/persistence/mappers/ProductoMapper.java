package com.polos.luciana.persistence.mappers;

import com.polos.luciana.domain.dto.request.ProductoDto;
import com.polos.luciana.persistence.entity.Producto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductoMapper {

    Producto toEntity(ProductoDto ProductoDto);

    ProductoDto toDto(Producto Producto);

    List<ProductoDto>toDtoList(List<Producto> ProductoList);
}
