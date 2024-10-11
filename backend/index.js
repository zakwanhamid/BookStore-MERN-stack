import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
//options 1: Allow all origins with default of cors(*)
app.use(cors());
//options 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         method: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack tutorial");
});

//to use book route from booksRoute
app.use("/books", booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
