import React from "react";
import "./NewsComponent.css"; // Import your CSS file for styling

const NewsComponent = () => {
  const newsData = [
    {
      id: 1,
      image: "https://example.com/news1.jpg",
      title: "New Book Releases: Dive into Exciting Reads!",
      description:
        "Explore our latest collection of books, featuring thrilling novels, captivating non-fiction, and enchanting children's stories. From bestsellers to hidden gems, discover the literary wonders awaiting you in our newest arrivals. Don't miss out on the joy of discovering a compelling story – check out our fresh releases today!",
    },
    {
      id: 2,
      image: "https://example.com/news2.jpg",
      title: "Author Spotlight: Meet the Literary Maestros",
      description:
        "This month, we shine a spotlight on renowned authors who have left an indelible mark on the literary world. Learn about their inspirations, writing processes, and the stories behind their most beloved works. Join us in celebrating the brilliance of these literary maestros whose words continue to resonate with readers around the globe.",
    },
    {
      id: 3,
      image: "https://example.com/news3.jpg",
      title: "Virtual Book Club: Connect and Discuss",
      description:
        "Join our vibrant online book club community! Engage in lively discussions about the latest literary releases, share your favorite quotes, and connect with fellow book enthusiasts. Our virtual book club provides a platform to delve deeper into the stories that captivate us. Embrace the joy of reading together and expand your literary horizons!",
    },
    {
      id: 4,
      image: "https://example.com/news3.jpg",
      title: "Digital Library Expansion: Access Anytime, Anywhere",
      description:
        "Exciting news for our digital readers! We've expanded our online library to bring you an even broader selection of e-books and audiobooks. Whether you prefer mystery, romance, or science fiction, our digital collection offers a plethora of titles for your reading pleasure. Access the digital library from the comfort of your home or on the go – your next adventure awaits at your fingertips!",
    },
  ];

  return (
    <div className="news-container">
      <h2>Latest News</h2>
      {newsData.map((news) => (
        <div key={news.id} className="news-card">
          <div className="news-content">
            <h2>{news.title}</h2>
            <p>{news.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsComponent;
