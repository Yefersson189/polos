package com.polos.luciana.util;

import org.springframework.stereotype.Component;

import com.polos.luciana.domain.dto.response.ResponseServiceDto;
import com.polos.luciana.domain.dto.response.StatusDto;

@Component
public class RequestResponseUtils {

	/**
     * Crea la respuesta de la petición
     * @param codigoRespuesta codigo de respuesta HTTP
     * @param descripcionRespuesta información del estado de respuesta HTTP
     * @return ResponseServiceDto estructura de respuesta de la petición
     */
    public ResponseServiceDto construirRespuesta(Integer codigoRespuesta, String descripcionRespuesta){

        return ResponseServiceDto.builder()
                .status(StatusDto.builder()
                        .statusCode(codigoRespuesta)
                        .statusDesc(descripcionRespuesta)
                        .build())
                .build();
    }
}
