package com.polos.luciana.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BusinessException extends RuntimeException{

    private final String code;
    private final String message;
    private final Object  data;

    public BusinessException(String code, String message) {
        this.code = code;
        this.message = message;
        this.data = null;
    }
}
