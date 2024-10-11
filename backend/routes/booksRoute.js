//this file is to asingkan the route for each model
//each model will have each route file , so no need to put all in the index.js
import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//create new books
  router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Fill in all required field: title, author, publish year",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
      return response.status(200).send(book);
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  });
  
  //fetch books data
  router.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //fetch book data by id
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Book.findById(id);
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //update book by id
  router.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Please fill in all required field...",
        });
      }
  
      const { id } = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(400).send({ message: "Book not found..." });
      }
  
      return response.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ messsage: error.message });
    }
  });
  
  //delete a book by id
  router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        return response.status(400).json({ message: "Book not found" });
      }
  
      return response.status(200).send({ message: "Book deleted..." });
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });

export default router;