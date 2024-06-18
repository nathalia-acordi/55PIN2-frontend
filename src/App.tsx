import "./App.css";
import Banner from "./components/Banner";
import BookCard from "./components/BookCard";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {

  return (
    <>
      <Header />
      <Banner />
      <BookCard title="Últimos lançamentos" />
      <BookCard title="Livros em destaque" />
      <BookCard title="Com base no seu histórico" />
      <Footer />
    </>
  );
}

export default App;
