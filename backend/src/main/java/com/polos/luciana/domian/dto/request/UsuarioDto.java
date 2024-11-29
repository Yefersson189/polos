package com.polos.luciana.domian.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import static com.polos.luciana.util.constant.Constant.NOT_BLANK;
import static com.polos.luciana.util.constant.Constant.NOT_NULL;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDto {
	
	Integer id;
	
	@JsonProperty("nombreCompleto")
	@NotBlank(message = "Nombre Completo"+NOT_BLANK)
	@NotNull(message = "Nombre Completo"+NOT_NULL)
	String nombreCompleto;
	
	@JsonProperty("nombreUsuario")
	@NotBlank(message = "Nombre Usuario"+NOT_BLANK)
	@NotNull(message = "Nombre Usuario"+NOT_NULL)
	String nombreUsuario;
	
	@NotBlank(message = "Clave"+NOT_BLANK)
	@NotNull(message = "Clave"+NOT_NULL)
	String clave;
	
	@NotBlank(message = "Correo"+NOT_BLANK)
	@NotNull(message = "Correo"+NOT_NULL)
	String correo;
	
	@NotBlank(message = "Celular"+NOT_BLANK)
	@NotNull(message = "Celular"+NOT_NULL)
	String celular;
	
	@NotBlank(message = "Direccion"+NOT_BLANK)
	@NotNull(message = "Direccion"+NOT_NULL)
	String direccion;
	
	@NotBlank(message = "Estado"+NOT_BLANK)
	@NotNull(message = "Estado"+NOT_NULL)
	String estado;
}
