import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully..', {variant: 'success'})
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened. Please check console");
        enqueueSnackbar('Error', {variant: 'error'
        })
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-xl my-4 mx-auto w-[200px] text-center"> Create Book </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[400px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-lg mr-4 text-gray-500">Title</label>
          <input
            className="p-2 border rounded border-gray-500 w-full"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="my-1">
          <label className="text-sm mr-4 text-gray-500">Author</label>
          <input
            className=" p-2 border rounded border-gray-500 w-full"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div className="my-4">
          <label className="text-sm mr-4 text-gray-500">Publish Year</label>
          <input
            className=" p-2 border rounded border-gray-500 w-full"
            type="number"
            onChange={(e) => setPublishYear(e.target.value)}
            value={publishYear}
          />
        </div>
        <button
          className="p-1 bg-sky-300 rounded mt-2"
          onClick={handleSaveBook}
        > Save </button>
      </div>
    </div>
  );
};

export default CreateBook;
