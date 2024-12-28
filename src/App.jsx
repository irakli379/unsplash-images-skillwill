import axios from "axios";
import { useEffect, useRef, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const IMAGES_PER_PAGE = 30;

function App() {
  const searchInput = useRef("");
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  function handleSearch(e) {
    e.preventDefault();
    getImages();
  }

  function handleSelection(search) {
    searchInput.current.value = search;
    getImages();
  }

  async function getImages() {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
      );

      setImages(data.results);
      setTotalPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Acontainer">
      <h1>Search For The Image</h1>
      <form className="search-section" onSubmit={handleSearch}>
        <input
          type="search"
          ref={searchInput}
          placeholder="Type something here to search..."
        />
      </form>
      <div className="filters">
        <div onClick={() => handleSelection("Cats")}>cats</div>
        <div onClick={() => handleSelection("Dogs")}>Dogs</div>
        <div onClick={() => handleSelection("Birds")}>Birds</div>
        <div onClick={() => handleSelection("Trees")}>Trees</div>
      </div>
      <div className="images">
        {images.map((img) => {
          return (
            <img key={img.id} src={img.urls.small} alt={img.alt_description} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
