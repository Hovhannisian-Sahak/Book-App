import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  box: {
    display: "flex",
    justifyContent: "center",
  },
  innerBox: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgb(51,153,255) ",
    margin: "15px 0",
    width: "100px",
  },
  line: {
    textDecoration: "line-through",
  },
  text: {
    color: "red",
  },
  desc: {
    padding: "30px 0",
    width: "600px",
  },
});

const BookDetail = () => {
  const [book, setBooks] = useState([]);
  const { id } = useParams();
  const classes = useStyles();

  const navigate = useNavigate();
  const fetchDetails = async () => {
    const res = await fetch(`http://localhost:3001/books/${id}`);
    // eslint-disable-next-line no-const-assign
    const book = await res.json();
    setBooks(book);
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <Header />

      <Box className={classes.box}>
        <Box mr={10}>
          <img width="400px" height="600px" src={book.photo} alt="" />
        </Box>
        <Box>
          <Typography variant="h2">{book.name}</Typography>
          <Box className={classes.innerBox}>
            <Typography
              className={book.discount ? classes.line : null}
              variant="h6"
            >
              {book.price}$
            </Typography>
            <Typography className={classes.text} variant="h6">
              {book.discount ? book.discount + "$" : null}
            </Typography>
          </Box>

          <Typography variant="h5">Description</Typography>
          <Typography className={classes.desc}>{book.description}</Typography>

          <Button
            onClick={() => navigate("/")}
            className={classes.link}
            variant="h6"
          >
            <BiArrowBack />
            Back
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default BookDetail;
