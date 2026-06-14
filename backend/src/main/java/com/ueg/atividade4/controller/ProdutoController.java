package com.ueg.atividade4.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ueg.atividade4.model.Produto;
import com.ueg.atividade4.repository.ProdutoRepository;

@RestController
@RequestMapping("/mcontroller")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @GetMapping("/materiais")
    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    @GetMapping("/materiais/{id}")
    public ResponseEntity<Produto> consultar(@PathVariable Long id) {
        return produtoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/materiais")
    public Produto inserir(@RequestBody Produto produto) {
        produto.setId(null);
        return produtoRepository.save(produto);
    }

    @PutMapping("/materiais/{id}")
    public ResponseEntity<Produto> alterar(@PathVariable Long id, @RequestBody Produto produto) {
        return produtoRepository.findById(id)
            .map(existente -> {
                existente.setDescricao(produto.getDescricao());
                existente.setSetor(produto.getSetor());
                existente.setValorUnitario(produto.getValorUnitario());
                existente.setQuantidade(produto.getQuantidade());
                existente.setDataEntrada(produto.getDataEntrada());
                existente.setEmUso(produto.getEmUso());
                existente.setImagemUrl(produto.getImagemUrl());
                return ResponseEntity.ok(produtoRepository.save(existente));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/materiais/{id}")
    public ResponseEntity<Map<String, Boolean>> excluir(@PathVariable Long id) {
        return produtoRepository.findById(id)
            .map(produto -> {
                produtoRepository.delete(produto);
                return ResponseEntity.ok(Map.of("excluido", true));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
