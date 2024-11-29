package com.polos.luciana.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.polos.luciana.domian.UsuarioService;
import com.polos.luciana.domian.dto.request.UsuarioDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService service;

	@GetMapping
	public List<UsuarioDto> listar() {
		return service.listar();
	}

	@PostMapping("/add")
	public UsuarioDto adicionar(@RequestBody UsuarioDto usuario) {

		return service.adicionar(usuario);
	}

	@GetMapping("/listid")
	public UsuarioDto listarId(@RequestParam int id) {

		return service.listarId(id);
	}

	@GetMapping("/listUser")
	public UsuarioDto listarUserClave(@RequestParam String nombreUsuario ,
									  @RequestParam String clave) {

		return service.listarUserClave(nombreUsuario, clave);
	}

	@PutMapping("/edit")
	public UsuarioDto editar(@RequestBody @Valid UsuarioDto usuarioDto) {

		return service.editar(usuarioDto);
	}
}
