import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookList, BookDetail } from "./components";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("http://localhost:3001/books");

      setBooks(res.data);
    };
    getBooks();
  }, []);

  const editBook = async (
    id,
    newName,
    newDescription,
    newPrice,
    newDiscount,
    newPhoto
  ) => {
    const res = await axios.put(`http://localhost:3001/books/${id}`, {
      name: newName,
      description: newDescription,
      price: newPrice,
      discount: newDiscount,
      photo: newPhoto,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...res.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const createBook = async (name, description, price, discount, photo) => {
    const res = await axios.post("http://localhost:3001/books", {
      name,
      description,
      price,
      discount,
      photo,
    });

    const updatedBooks = [...books, res.data];

    setBooks(updatedBooks);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((contact) => {
      return contact.id !== id;
    });
    setBooks(updatedBooks);
  };
  const handleSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = books.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(books);
    }
  };
  return (
    <div>
      <Routes>
        {/* <Route exact path="/addBook" element={content} /> */}
        <Route
          exact
          path="/"
          element={
            <BookList
              term={searchTerm}
              searchKeyword={handleSearchTerm}
              addBook={createBook}
              books={searchTerm.length < 3 ? books : searchResults}
              onDelete={deleteBook}
              onEdit={editBook}
            />
          }
        />
        <Route exact path="/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
}
