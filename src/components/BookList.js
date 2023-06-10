import React, { useState, useRef } from "react";
// import Button from "./Button";
import BookCard from "./BookCard";
import Header from "./Header";
import AddBook from "./AddBook";

import { Grid, Box, Button } from "@mui/material";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.5)",
    width: "50%",
    maxWidth: "100vw",
    maxHeight: "100%",
    position: "fixed",
    top: "50%",
    right: "0",
    transform: "translate(0, -50%)",
    overflowY: "auto",
    zIndex: 99,
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 220px)", //the width of the card
    justifyContent: "center",
    gridGap: "20px",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
}));

export default function BookList({
  addBook,
  books,
  onEdit,
  onDelete,
  term,
  searchKeyword,
}) {
  const classes = useStyles();
  const [showAddBook, setShowAddBook] = useState(false);
  const inputEl = useRef("");
  const showAddForm = () => {
    setShowAddBook(true);
  };
  const hideAddForm = () => {
    setShowAddBook(false);
    console.log("hi");
  };
  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };

  let content;

  showAddBook
    ? (content = (
        <Box className={classes.backDrop}>
          <AddBook addBook={addBook} hideAddForm={hideAddForm} />
        </Box>
      ))
    : // eslint-disable-next-line no-unused-vars
      (content = null);

  return (
    <div>
      <Header />

      <Box className={classes.box}>
        <input
          ref={inputEl}
          value={term}
          onChange={getSearchTerm}
          className="border-2 border-black px-2 "
          placeholder="Search..."
        />
        <Button onClick={showAddForm}>Add book</Button>
      </Box>
      <Box className={classes.list}>
        {books.map((book) => {
          return (
            <Grid item xs key={book.id}>
              <BookCard
                addBook={addBook}
                key={book.id}
                book={book}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </Grid>
          );
        })}
      </Box>
      {content}
    </div>
  );
}
