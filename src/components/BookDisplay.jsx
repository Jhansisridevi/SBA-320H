import React, { useReducer, useEffect } from "react";
import axios from "axios";
import BookPopup from "./BookPopup";
import "./BookDisplay.css";

const initialState = {
  searchTerm: "",
  results: [],
  selectedBook: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_BOOKS":
      return { ...state, books: action.payload };
    case "SELECT_BOOK":
      return { ...state, selectedBook: action.payload };
    case "CLEAR_SELECTED_BOOK":
      return { ...state, selectedBook: null };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const BookDisplay = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${
            state.searchTerm
          }&maxResults=15&key=${import.meta.env.VITE_API_KEY}`
        );

        dispatch({ type: "SET_RESULTS", payload: response.data.items || [] });
      } catch (error) {
        console.error("Error fetching results:", error);
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching results. Please try again.",
        });
      }
    };

    if (state.searchTerm.trim() !== "") {
      fetchResults();
    } else {
      dispatch({ type: "SET_RESULTS", payload: [] });
    }
  }, [state.searchTerm]);
  const selectBook = (book) => {
    dispatch({ type: "SELECT_BOOK", payload: book });
  };
  const clearSelectedBook = () => {
    dispatch({ type: "CLEAR_SELECTED_BOOK" });
  };
  return (
    <div className="book-display">
      <h3 className="search-heading">What would you like to search for?</h3>
      <br />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books..."
          value={state.searchTerm}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
          }
        />
        <button
          onChange={(e) => dispatch({ type: "SET_RESULTS", payload: [] })}
        >
          Search
        </button>
      </div>
      {state.error && <p className="error-message">{state.error}</p>}
      <div className="book-cards">
        {state.results.map((result) => (
          <div
            key={result.id}
            className="book-card"
            onClick={() => selectBook(result)}
          >
            <img
              src={result.volumeInfo.imageLinks.thumbnail}
              alt={result.volumeInfo.title}
              className="book-cover"
            />
          </div>
        ))}
      </div>
      {state.selectedBook && (
        <BookPopup book={state.selectedBook} onClose={clearSelectedBook} />
      )}
    </div>
  );
};

export default BookDisplay;
