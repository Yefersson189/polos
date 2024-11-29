package com.polos.luciana.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDto {
	
	Integer id;
	
	@JsonProperty("nombreCompleto")
	@NotBlank
	@NotNull
	String nombreCompleto;
	
	@JsonProperty("nombreUsuario")
	@NotBlank
	@NotNull
	String nombreUsuario;
	
	@NotBlank
	@NotNull
	String clave;
	
	@NotBlank
	@NotNull
	String correo;
	
	@NotBlank
	@NotNull
	String celular;

	@NotBlank
	@NotNull
	String direccion;

	@NotNull
	boolean estado;
}
