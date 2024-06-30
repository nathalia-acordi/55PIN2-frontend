import getDados from "./dadosLivros";
import Input from "../Input";
import {useState, useEffect } from "react";

function CarregaLivrosPesquisados() {
    const [livrosPesquisados, setLivrosPesquisados] = useState([])

    const onBlurInput = async evento => {
        var textoDigitado = evento.target.value;

        try {
            const livros = await getDados(`/api/livros`);
            const resultadoPesquisa = livros.filter(livro => livro.titulo.toLowerCase().includes(textoDigitado))
            setLivrosPesquisados(resultadoPesquisa)
            console.log(resultadoPesquisa)
        } catch (error) {
            console.error('Erro ao carregar os livros:', error);
        }
    };

    return (
        <div>
            <Input
                placeholder="Busque por título, editora, autor ou ISBN"
                id="input-header"
                onBlur={onBlurInput} // Atribui a função onBlurInput ao evento onBlur
            />
        </div>
    );
}

export default CarregaLivrosPesquisados