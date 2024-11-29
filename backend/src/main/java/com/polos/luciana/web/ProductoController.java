package com.polos.luciana.web;

import com.polos.luciana.domain.ProductoService;
import com.polos.luciana.domain.dto.request.ProductoDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200", maxAge=3600)
@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @GetMapping
    public List<ProductoDto> listar() {
        return service.listar();
    }

    @PostMapping("/add")
    public ProductoDto adicionar(@RequestBody ProductoDto producto) {

        return service.adicionar(producto);
    }

    @GetMapping("/listid")
    public ProductoDto listarId(@RequestParam int id) {

        return service.listarId(id);
    }

    @PutMapping("/edit")
    public ProductoDto editar(@RequestBody @Valid ProductoDto productoDto) {

        return service.editar(productoDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> eliminar(@RequestParam int id) {

        service.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
