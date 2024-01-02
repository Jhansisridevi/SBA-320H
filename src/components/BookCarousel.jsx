import React, { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookPopup from "./BookPopup";
import "./BookCarousel.css";

const initialState = {
  books: [],
  popularBooks: [],
  eBooks: [],
  zenBooks: [],
  selectedBook: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POPULAR_BOOKS":
      return { ...state, popularBooks: action.payload };
    case "SET_EBOOKS":
      return { ...state, eBooks: action.payload };
    case "SET_ZENBOOKS":
      return { ...state, zenBooks: action.payload };
    case "SET_BOOKS":
      return { ...state, books: action.payload };
    case "SELECT_BOOK":
      return { ...state, selectedBook: action.payload };
    case "CLEAR_SELECTED_BOOK":
      return { ...state, selectedBook: null };
    default:
      return state;
  }
};
const BookCarousel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchBooksCategory = async (category, maxResults = 8) => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: {
              q: `subject:${category}`,
              maxResults,
              key: import.meta.env.VITE_API_KEY,
            },
          }
        );
        return response.data.items || [];
      } catch (e) {
        console.error(`Error fetching ${category} books:`, e.message);
        return [];
      }
    };
    const fetchAllBooks = async () => {
      const popularBooks = await fetchBooksCategory("programming");
      const eBooks = await fetchBooksCategory("marketing");
      const zenBooks = await fetchBooksCategory("mindfulness");
      dispatch({ type: "SET_POPULAR_BOOKS", payload: popularBooks });
      dispatch({ type: "SET_EBOOKS", payload: eBooks });
      dispatch({ type: "SET_ZENBOOKS", payload: zenBooks });
    };
    fetchAllBooks();
  }, []);
  const selectBook = (book) => {
    dispatch({ type: "SELECT_BOOK", payload: book });
  };
  const clearSelectedBook = () => {
    dispatch({ type: "CLEAR_SELECTED_BOOK" });
  };
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  // };
  return (
    <>
      <h1>Popular Books</h1>
      <div className="book-cards">
        {state.popularBooks.map((book) => (
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
      {/* <div className="carousel-container">
      <Slider ref={sliderRef} {...settings}>
        {state.popularBooks.map((book) =>(
          <div key = {book.id}>
            <img className="carousel-image" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            <p>{book.volumeInfo.title}</p>
          </div>
        ))}
      </Slider>
      </div> */}
      <h1>E Books</h1>
      <div className="book-cards">
        {state.eBooks.map((book) => (
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
      <h1>Mindfulness</h1>
      <div className="book-cards">
        {state.zenBooks.map((book) => (
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
    </>
  );
};

export default BookCarousel;
