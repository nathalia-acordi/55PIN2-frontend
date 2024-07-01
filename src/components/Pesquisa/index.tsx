import getDados from "./dadosLivros";
import Input from "../Input";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Pesquisa.css";

function CarregaLivrosPesquisados() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onChange = async (e) => {
    const textoDigitado = e.target.value;
    setSearchParams({ search: textoDigitado });
    if (e.keyCode === 13) {
      navigate(`/busca?search=${searchParams.get("search")}`);
    }
    /*

        try {
            const livros = await getDados(`/api/livros`);
            const resultadoPesquisa = livros.filter(livro => livro.titulo.toLowerCase().includes(textoDigitado))
            setLivrosPesquisados(resultadoPesquisa)
            console.log(resultadoPesquisa)
        } catch (error) {
            console.error('Erro ao carregar os livros:', error);
        }*/
  };

  return (
    <input
      placeholder="Busque por título, editora, autor ou ISBN"
      id="input-header"
      onKeyUp={onChange} // Atribui a função onBlurInput ao evento onBlur
      className="inputSearch"
    />
  );
}

export default CarregaLivrosPesquisados;
