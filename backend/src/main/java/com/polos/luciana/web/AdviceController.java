package com.polos.luciana.web;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.polos.luciana.domain.dto.response.ResponseServiceDto;
import com.polos.luciana.exception.BusinessException;
import com.polos.luciana.util.RequestResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import static com.polos.luciana.util.constant.Constant.RESPONSE_METODO_NOENCONTRADO;
import static com.polos.luciana.util.constant.Constant.RESPONSE_REQUEST_ERROR;

@RestControllerAdvice
public class AdviceController {

	@Autowired
	private RequestResponseUtils requestResponseUtils;

	/**
	 * Manejo de excepciones BusinessException del servicio
	 * @param businessException la excepcion BusinessException
	 * @return ResponseEntity con la respuesta definida al servicio
	 */
	@ExceptionHandler(value = BusinessException.class)
	public ResponseEntity<ResponseServiceDto> handlerbusinessException (BusinessException businessException)  {
		ResponseServiceDto responseServiceDto = requestResponseUtils.construirRespuesta(Integer.valueOf(businessException.getCode()),
				businessException.getMessage());

		return ResponseEntity.status(Integer.parseInt(businessException.getCode())).body(responseServiceDto);
	}

	/**
	 * Manejo de excepciones NoHandlerFoundException del servicio
	 * @return ResponseEntity con la respuesta definida al servicio
	 */
	@ExceptionHandler(value = NoHandlerFoundException.class)
	public ResponseEntity<ResponseServiceDto> handlerNoFoundException ()  {
		ResponseServiceDto responseServiceDto = requestResponseUtils.construirRespuesta(HttpStatus.NOT_FOUND.value(),
				RESPONSE_METODO_NOENCONTRADO);

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseServiceDto);
	}


	/**
	 * Manejo de excepciones MethodArgumentNotValidException del servicio
	 * @param ex la excepcion MethodArgumentNotValidException
	 * @return ResponseEntity con la respuesta definida al servicio
	 */
	@ExceptionHandler(value = MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseServiceDto> handleValidationExceptions(MethodArgumentNotValidException ex) {

		return new ResponseEntity<> (requestResponseUtils.construirRespuesta(HttpStatus.BAD_REQUEST.value(),
				RESPONSE_REQUEST_ERROR), HttpStatus.BAD_REQUEST);
	}

	/**
	 * Manejo de excepciones IllegalArgumentException del servicio
	 * @param ex la excepcion IllegalArgumentException
	 * @return ResponseEntity con la respuesta definida al servicio
	 */
	@ExceptionHandler(value = IllegalArgumentException.class)
	public ResponseEntity<ResponseServiceDto> handleIllegalArgumentException(IllegalArgumentException ex) {

		return new ResponseEntity<> (requestResponseUtils.construirRespuesta(HttpStatus.BAD_REQUEST.value(),
				RESPONSE_REQUEST_ERROR), HttpStatus.BAD_REQUEST);
	}

	/**
	 * Manejo de excepciones MissingServletRequestParameterException del servicio
	 * @param ex la excepcion MissingServletRequestParameterException
	 * @return ResponseEntity con la respuesta definida al servicio
	 */
	@ExceptionHandler(value = MissingServletRequestParameterException.class)
	public ResponseEntity<ResponseServiceDto> handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {

		return new ResponseEntity<> (requestResponseUtils.construirRespuesta(HttpStatus.BAD_REQUEST.value(),
				RESPONSE_REQUEST_ERROR), HttpStatus.BAD_REQUEST);
	}

	/**
	 * Manejo de excepciones InvalidFormatException del servicio
	 * @param exception la excepcion HttpMessageNotReadableException
	 * @return ResponseEntity con la respuesta definida al servicio
	 */
	@ExceptionHandler(value = HttpMessageNotReadableException.class)
	public ResponseEntity<ResponseServiceDto> handlerHttpMessageNotReadableException (HttpMessageNotReadableException exception)  {

		Throwable mostSpecificCause = exception.getMostSpecificCause();

		if (mostSpecificCause instanceof JsonParseException ||
				mostSpecificCause instanceof IllegalArgumentException ||
				mostSpecificCause instanceof HttpMessageNotReadableException ||
				mostSpecificCause instanceof InvalidFormatException) {
			return new ResponseEntity<> (requestResponseUtils.construirRespuesta(HttpStatus.BAD_REQUEST.value(),
					RESPONSE_REQUEST_ERROR), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<> (requestResponseUtils.construirRespuesta(HttpStatus.INTERNAL_SERVER_ERROR.value(),
				(HttpStatus.INTERNAL_SERVER_ERROR).getReasonPhrase()), HttpStatus.INTERNAL_SERVER_ERROR);
	}


	/**
	 * Manejo de excepciones Exception del servicio
	 * @param exception la excepcion Exception
	 * @return ResponseEntity con la respuesta definida al servicio
	 */
	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<ResponseServiceDto> handlerException (Exception exception)  {
		return new ResponseEntity<> (requestResponseUtils.construirRespuesta(HttpStatus.INTERNAL_SERVER_ERROR.value(),
				(HttpStatus.INTERNAL_SERVER_ERROR).getReasonPhrase()), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
