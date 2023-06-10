import React, { useState } from "react";
import { GoTrashcan, GoPencil } from "react-icons/go";
import EditBook from "./EditBook";
import Button from "./Button";

import {
  Typography,
  Card,
  Box,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
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
  box: {
    display: "flex",
    justifyContent: "space-between",
  },
  line: {
    textDecoration: "line-through",
  },
  discount: {
    color: "red",
  },
  percent: {
    color: "red",
  },
}));

export default function BookCard({ book, onEdit, onDelete }) {
  const [showEdit, setShowEdit] = useState(false);

  const { id } = book;
  const handleDelete = () => {
    onDelete(id);
  };
  const showEditForm = () => {
    setShowEdit(true);
  };
  const hideEditForm = () => {
    setShowEdit(false);
  };
  const handleSubmit = (
    id,
    newName,
    newDescription,
    newPrice,
    newDiscount,
    newPhoto
  ) => {
    setShowEdit(false);
    onEdit(id, newName, newDescription, newPrice, newDiscount, newPhoto);
  };
  const classes = useStyles();
  let content;
  if (showEdit) {
    // eslint-disable-next-line no-unused-vars
    content = (
      <Box className={classes.backDrop}>
        <EditBook
          hideEditForm={hideEditForm}
          onEdit={onEdit}
          book={book}
          onSubmit={handleSubmit}
        />
      </Box>
    );
  }
  // console.log(book);
  const base64 = book.photo;

  let percent;
  let discountValue;
  let saled;

  if (JSON.stringify(Number(book.discount)) > 0) {
    discountValue = JSON.stringify(Number(book.discount)) + "$";
    percent =
      (
        (discountValue.split("").slice(0, -1).join("") /
          JSON.stringify(Number(book.price))) *
        100
      ).toFixed(0) +
      "%" +
      " " +
      "discount";
    saled = true;
  } else {
    saled = false;
    discountValue = "";
  }

  return (
    <>
      {/* <Link to={`/${book.id}`}>
        <Typography>{JSON.stringify(book.name).replace(/"/g, "")}</Typography>
        <Typography>
          {JSON.stringify(book.description).replace(/"/g, "")}
        </Typography>
        <Typography>{JSON.stringify(Number(book.price))}</Typography>
        <Typography>{JSON.stringify(Number(book.discount))}</Typography>
        <Typography>{JSON.stringify(book.photo)}</Typography>
      </Link>
      <Button onClick={handleDelete}>Delete</Button>
      <Button onClick={showEditForm}>Edit</Button>
      {content} */}

      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/${book.id}`} style={{ textDecoration: "none" }}>
          <CardActionArea>
            <CardMedia component="img" image={base64} />

            <CardContent>
              <Box className={classes.box}>
                <Box>
                  <Typography gutterBottom>
                    {JSON.stringify(book.name).replace(/"/g, "")}
                  </Typography>
                  <Typography className={classes.percent}>{percent}</Typography>
                </Box>
                <Box>
                  <Typography className={saled ? classes.line : null}>
                    {JSON.stringify(Number(book.price))}$
                  </Typography>
                  <Typography className={classes.discount}>
                    {discountValue}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button onClick={handleDelete}>
            Delete
            <GoTrashcan />
          </Button>
          <Button onClick={showEditForm}>
            Edit
            <GoPencil />
          </Button>
        </CardActions>
      </Card>

      {content}
    </>

    // </Link>
  );
}
