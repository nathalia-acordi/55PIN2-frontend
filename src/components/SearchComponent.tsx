import "./SearchComponent.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { useSearchParams } from "react-router-dom";

interface Book {
  id: number;
  titulo: string;
  imagem: string;
  descricao: string;
  categorias: string;
  dataPublicacao: string;
  status: string;
  // Outras propriedades do livro, se houver
}

function SearchComponent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedBook, setSelected] = useState<string>("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(
          `http://localhost:8083/api/livros/${searchParams.get(
            "search"
          )}/livros-pesquisado`
        );
        // Check if response.data is an array before updating the state
        console.log(response);
        if (Array.isArray(response.data)) {
          const mapped = response.data.map((item: Book) => {
            return { ...item, status: "0" };
          });
          setBooks(mapped);
        } else {
          console.error("A resposta da API não é uma array:", response.data);
          setBooks([]);
        }
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setBooks([]);
      }
    }

    fetchBooks();
  }, [searchParams]);

  return (
    <div className="container-search">
      <div
        style={{
          display: selectedBook.length !== 0 ? "block" : "none",
          height: "50%",
          width: "50%",
          backgroundColor: "#200E38",
          position: "fixed",
          top: "20%",
          left: "25%",
          padding: "64px",
        }}
      >
        <button
          onClick={() => setSelected("")}
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            top: "32px",
            right: "32px",
            zIndex: 999,
            width: "auto",
          }}
        >
          x
        </button>
        {selectedBook}
      </div>
      <div className="menu-search">
        <h1>Leitores</h1>
        <h1 className="active">Livros</h1>
        <h1>Autores</h1>
        <h1>Editores</h1>
      </div>
      {books.length === 0 ? (
        <h2>Nenhum livro encontrado.</h2>
      ) : (
        <h2>{books.length} encontrados</h2>
      )}
      <div className="container-books-search">
        {books.map((book, index) => (
          <div key={book.id} className="book-item-search">
            <div>
              <img
                className="image-book-search"
                src={book.imagem}
                alt={book.titulo}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
                gap: 8,
              }}
            >
              <h3>{book.titulo}</h3>
              <h4>{book.dataPublicacao}</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <select
                style={{
                  background:
                    book.status === "0"
                      ? "#3d0a49"
                      : book.status === "1"
                      ? "#0b490a"
                      : book.status === "2"
                      ? "#d9c63e"
                      : book.status === "3"
                      ? "#909090"
                      : "#490b0a",
                }}
                onChange={(e) => {
                  const bookList = books;
                  bookList[index].status = e.target.value;

                  setBooks([...bookList]);
                }}
              >
                <option value="0">Adicionar +</option>
                <option value="1">Lido</option>
                <option value="2">Quero Ler</option>
                <option value="3">Relendo</option>
                <option value="4">Abandonei</option>
              </select>

              <button onClick={() => setSelected(book.descricao)}>
                Ler sinopse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchComponent;
