import "./BookCard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Book {
  id: number;
  titulo: string;
  imagem: string;
  // Outras propriedades do livro, se houver
}

function BookCard({ title }: any) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      let endpoint = "";
      switch (title) {
        case "Últimos lançamentos":
          endpoint = "ultimos-lancamentos";
          break;
        case "Livros em destaque":
          endpoint = "livros-em-destaque";
          break;
        case "Com base no seu histórico":
          break;
        default:
          console.error("Título não reconhecido:", title);
          return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8083/api/livros/${encodeURIComponent(endpoint)}`
        );
        // Check if response.data is an array before updating the state
        console.log(response);
        if (Array.isArray(response.data)) {
          setBooks(response.data);
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
  }, [title]);

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="container-books">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img className="image-book" src={book.imagem} alt={book.titulo} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookCard;
