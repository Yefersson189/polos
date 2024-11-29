package com.polos.luciana.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoDto {

    private Integer id;

    @NotBlank
    @NotNull
    private String nombre;

    @NotBlank
    @NotNull
    private String talla;

    @NotNull
    private BigDecimal precio;

    @NotBlank
    @NotNull
    private String imagen;

    @NotNull
    private boolean estado;
}
