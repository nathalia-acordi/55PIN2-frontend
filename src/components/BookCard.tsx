import "./BookCard.css";

function BookCard({ title }: any) {
  return (
    <div className="container">
      <h1> {title}</h1>
      <div className="container-books">
        {[0, 0, 0, 0, 0, 0].map((item) => (
          <div className="image-book"></div>
        ))}
      </div>
    </div>
  );
}
export default BookCard;
