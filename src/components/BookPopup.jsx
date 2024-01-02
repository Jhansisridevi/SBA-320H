import React from "react";
import "./Bookpopup.css";

const BookPopup = ({ book, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h3></h3>
        <div className="two-columns">
          <div className="left-column">
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              className="left-section"
            />
          </div>
          <div className="right-column">
            <h3>{book.volumeInfo.title}</h3>
            <p>
              Author:{" "}
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Unknown"}
            </p>
            <p>Page Count: {book.volumeInfo.pageCount}</p>
            <p>Category: {book.volumeInfo.categories}</p>
            <p>Origin Country: {book.saleInfo.country}</p>
          </div>
        </div>
        <p className="book-details">{book.volumeInfo.description}</p>
      </div>
    </div>
  );
};

export default BookPopup;
