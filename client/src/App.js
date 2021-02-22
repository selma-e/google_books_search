import { useState, useEffect } from "react";
import API from "./utils/API";
import { Col, Row, Container, Jumbotron, Button } from "react-bootstrap";

function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!search) {
      return;
    }
    const handle = setTimeout(() => {
      API.searchBooks(search)
        .then((res) => res.data.items)
        .then((items) =>
          items
            .map(({ volumeInfo }) => volumeInfo)
            .map(
              ({
                title,
                description,
                authors,
                imageLinks: { thumbnail } = {},
                infoLink,
              }) => ({
                title,
                description,
                authors,
                image: thumbnail,
                link: infoLink,
              })
            )
        )
        .then((books) => setBooks(books));
    }, 700);
    return () => clearTimeout(handle);
  }, [search]);

  return (
    <>
      <div>
        <input onChange={(e) => setSearch(e.target.value)}></input>
      </div>
      {books.map((book, i) => (
        <div key={i}>
          <h1>
            <a href={book.link}>{book.title}</a>
          </h1>
          <h2>{book.authors}</h2>
          <div>{book.description}</div>
          <img src={book.image} />
        </div>
      ))}
    </>
  );
}

export default App;
