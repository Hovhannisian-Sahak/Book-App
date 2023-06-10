import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { Typography, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { useState } from "react";

export default function AddBook({ hideAddForm, addBook }) {
  const [preview, setPreview] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string("Enter book name")
      .required("name is required")
      .max(200, "name muse be max 200 characters"),
    description: Yup.string("Your description")
      .required("description is required")
      .max(400, "description muse be max 200 characters"),
    price: Yup.number("price")
      .positive("The number must be positive")
      .integer("The number must be an integer")
      .required("price required"),
    discount: Yup.number("discount")
      .positive("The number must be positive")
      .integer("The number must be an integer")
      .min(0, "the discount can not be lower than 0")
      .max(100, "the discount can not be higher than 100"),
    photo: Yup.mixed(),
  });

  return (
    <>
      <Typography align="center" mt={2}>
        Add Book
      </Typography>

      <Button align="center" onClick={hideAddForm} startIcon={<DeleteIcon />}>
        Close
      </Button>

      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          discount: "",
          avatar: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          addBook(
            values.name,
            values.description,
            values.price,
            values.discount,
            values.avatar
          );

          resetForm({ values: "" });
          hideAddForm();
        }}
      >
        {({ dirty, isValid, resetForm, setFieldValue }) => (
          <Form
            style={{
              marginTop: "0.1rem",
              width: "80%",
              padding: "1rem",
            }}
          >
            <FormikControl
              control="input"
              label="Name"
              id="name"
              name="name"
              placeholder="Enter book name"
            />
            <FormikControl
              control="input"
              label="Description"
              id="description"
              name="description"
              placeholder="your descrpition"
            />

            <FormikControl
              control="input"
              label="Price"
              id="price"
              name="price"
              placeholder="Enter price"
            />
            <FormikControl
              control="input"
              label="Discount"
              id="discount"
              name="discount"
              placeholder="Enter discount"
            />
            <FormikControl
              control="input"
              id="file"
              name="photo"
              type="file"
              onChange={(event) => {
                let reader = new FileReader();
                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setFieldValue("avatar", reader.result);
                    setPreview(reader.result);
                  }
                };
                reader.readAsDataURL(event.target.files[0]);
              }}
            />
            <img src={preview} alt="" />

            <Button type="submit" disabled={!(dirty && isValid)}>
              Submit
            </Button>
            <Button onClick={resetForm}>Cancel</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
