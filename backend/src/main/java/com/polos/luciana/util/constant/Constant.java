package com.polos.luciana.util.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Constant {

    /**
     * Validaciones
     */
	public static final String NOT_NULL = ": no puede ser nulo.";
    public static final String NOT_BLANK = ": no puede estar vacío.";

    /**
     * Mensajes
     */
    public static final String RESPONSE_REQUEST_ERROR = "Parametros Invalidos";
    public static final String RESPONSE_METODO_NOENCONTRADO = "Metodo invalido";



}
