
import React from "react";
import "./Home.css";
import book from "../assets/book.png";
import { Link } from "react-router-dom";
import BookCarousel from "../components/BookCarousel";

const Home = () => {
  return (
    <>
      <div className="home-page">
        <div className="hero-banner">
          <img src={book}></img>
        </div>
        <div className="cta-box">
          <p>Beyond Pages!! Where stories meet readers in the digital realm</p>
          <Link to="/search">
            <button>Explore</button>
          </Link>
        </div>
      </div>
      <BookCarousel />
    </>
  );
};

export default Home;
