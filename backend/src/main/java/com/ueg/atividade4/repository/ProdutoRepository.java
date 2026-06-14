package com.ueg.atividade4.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ueg.atividade4.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
