import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import "./SearchComponent.css";
import BookPopup from "./BookPopup";

const initialState = {
  searchTerm: "",
  searchResults: [],
  selectedBook: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload }; //check searchTerm
    case "SELECT_BOOK":
      return { ...state, selectedBook: action.payload };
    case "CLEAR_SELECTED_BOOK":
      return { ...state, selectedBook: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === "") {
        dispatch({ type: "SET_SEARCH_RESULTS", payload: [] });
        return;
      }
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: {
              q: searchTerm,
              maxResults: 16,
              key: import.meta.env.VITE_API_KEY,
            },
          }
        );
        dispatch({ type: "SET_SEARCH_RESULTS", payload: response.data.items });
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    };

    fetchData();
  }, [searchTerm]);
  const selectBook = (book) => {
    dispatch({ type: "SELECT_BOOK", payload: book });
  };
  const clearSelectedBook = () => {
    dispatch({ type: "CLEAR_SELECTED_BOOK", payload: "" });
  };
  const handleClear = () => {
    dispatch({ type: "SET_SEARCH_TERM", payload: " " });
    setSearchInput(" ");
    dispatch({ type: "SET_SEARCH_RESULTS", payload: [] }); // Clear previous results
    //fetchData(); //to fetch immediately
  };

  return (
    <>
      <div className="search-container">
        <h3>What would you like to search for?</h3>
        <input
          type="text"
          placeholder="Enter search term..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="display-buttons">
          <button onClick={() => setSearchTerm(searchInput)}>Search</button>
          <button onClick={handleClear}>Clear</button>
        </div>
        {state.error && <p className="error-message">{state.error}</p>}
      </div>
      <div className="display-container">
        <div className="book-cards">
          {state.searchResults.map((book) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => selectBook(book)}
            >
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="book-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {state.selectedBook && (
        <BookPopup book={state.selectedBook} onClose={clearSelectedBook} />
      )}
    </>
  );
};

export default SearchComponent;
