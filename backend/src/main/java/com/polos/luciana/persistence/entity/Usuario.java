package com.polos.luciana.persistence.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	 @Column(name = "nombre_completo")
	 private String nombreCompleto;
	 
	 @Column(name = "nombre_usuario")
	 private String nombreUsuario;
	 
	 @Column(name = "clave")
	 private String clave;
	 
	 @Column(name = "correo")
	 private String correo;
	 
	 @Column(name = "celular")
	 private String celular;
	 
	 @Column(name = "direccion")
	 private String direccion;
	 
	 @Column(name = "estado")
	 private boolean estado;
}
