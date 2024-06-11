import "./BookCard.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      let endpoint = '';
      switch (title) {
        case 'Últimos lançamentos':
          endpoint = 'ultimos-lancamentos';
          break;
        case 'Livros em destaque':
          endpoint = 'livros-em-destaque';
          break;
        case 'Com base no seu histórico':
          endpoint = 'base-no-historico';
          break;
        default:
          // Tratamento de erro se o título não corresponder a nenhum endpoint conhecido
          console.error('Título não reconhecido:', title);
          return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/livros/${encodeURIComponent(endpoint)}`);
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
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
            <div className="image-book">
              <img src={book.imagem} alt={book.titulo} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookCard;
