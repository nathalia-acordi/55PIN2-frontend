import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Footer from "./Footer";
import Header from "./Header";

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

function Profile() {
  const [books, setBooks] = useState<Book[]>([]);

  const [selectedBook, setSelected] = useState<string>("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(
          `http://localhost:8083/api/livros/ultimos-lancamentos`
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
  }, []);

  return (
    <>
      <Header />
      <div className="container-profile">
        <div
          style={{
            display: selectedBook.length !== 0 ? "block" : "none",
            height: "420px",
            width: "50%",
            backgroundColor: "#200E38",
            position: "fixed",
            top: "15%",
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
          <p>Nota (de 1 a 5)</p>
          <input
            id="input-header"
            type="number"
            style={{
              background: "#D9D9D9",
              border: "none",
              padding: "20px 24px",
              borderRadius: "50px",
              width: "400px",
              height: "20px",
              color: "black",
              fontSize: "16px",
              marginBottom: "30px",
              marginTop: "26px",
            }}
          />
          <p>Comentário (Opcional)</p>
          <input
            id="input-header"
            type="text"
            style={{
              background: "#D9D9D9",
              border: "none",
              padding: "20px 24px",
              borderRadius: "50px",
              width: "400px",
              height: "20px",
              color: "black",
              fontSize: "16px",
              marginBottom: "30px",
              marginTop: "26px",
            }}
          />
          <button
            onClick={() => setSelected("")}
            style={{
              backgroundColor: "#F5F5F5",
              color: "#000",
              width: "130px",
              height: "40px",
            }}
          >
            Salvar
          </button>
        </div>
        <div className="menu">
          <img src="/profile.png" alt="Litera Logo" className="profilepic" />
          <div>
            <h1>Bem Vindo</h1>
            <div style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  backgroundColor: "#200E38",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px",
                  width: "120px",
                }}
              >
                <div style={{ color: "#FFF", fontSize: 18 }}>Lidos</div>
                <div>0</div>
              </div>
              <div
                style={{
                  backgroundColor: "#200E38",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "120px",
                  padding: "16px",
                }}
              >
                <div style={{ color: "#FFF", fontSize: 18 }}>Lendo</div>
                <div>0</div>
              </div>
              <div
                style={{
                  backgroundColor: "#200E38",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  width: "120px",
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                <div style={{ color: "#FFF", fontSize: 18 }}>Relendo</div>
                <div>0</div>
              </div>
              <div
                style={{
                  backgroundColor: "#200E38",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "120px",
                  padding: "16px",
                }}
              >
                <div style={{ color: "#FFF", fontSize: 18 }}>Abandonei</div>
                <div>0</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              gap: 8,
            }}
          >
            <div
              style={{
                color: "#000",
                fontSize: 16,
                borderBottom: "1px solid #000",
                paddingBottom: 8,
              }}
            >
              Meus Amigos
            </div>
            <div
              style={{
                color: "#000",
                fontSize: 16,
                borderBottom: "1px solid #000",
                paddingBottom: 8,
              }}
            >
              Seguindo
            </div>
            <div
              style={{
                color: "#000",
                fontSize: 16,
                borderBottom: "1px solid #000",
                paddingBottom: 8,
              }}
            >
              Seguidores
            </div>
          </div>
          <div className="container-books-profile">
            {books.map((book, index) => (
              <div key={book.id} className="book-item-profile">
                <div>
                  <img
                    className="image-book-profile"
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
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 32 }}
                >
                  <button onClick={() => setSelected(book.descricao)}>
                    Avaliar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
