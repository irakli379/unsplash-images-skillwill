import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const IMAGES_PER_PAGE = 15;

function MainPage() {
  const [searchInput, setSearchInput] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSelection(search) {
    setPage(1);
    setSearchInput(search);
  }

  useEffect(() => {
    async function getImages() {
      try {
        setErrorMessage("");
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
        console.log(data);
      } catch (error) {
        setErrorMessage("Fetching images has failed. Try again.");
        console.log(error);
      }
    }

    if (!searchInput) return;
    getImages();
  }, [searchInput, page]);

  return (
    <div className={styles.Acontainer}>
      <h1>Search For The Image</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form
        className={styles.searchSection}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Type something here to search..."
        />
      </form>
      <div className={styles.filters}>
        <div onClick={() => handleSelection("Cats")}>Cats</div>
        <div onClick={() => handleSelection("Dogs")}>Dogs</div>
        <div onClick={() => handleSelection("Birds")}>Birds</div>
        <div onClick={() => handleSelection("Trees")}>Trees</div>
      </div>
      <div className={styles.images}>
        {images.length === 0 && searchInput === "" ? (
          ""
        ) : images.length === 0 ? (
          <div>Your search query didn't match any results</div>
        ) : (
          images.map((img) => {
            return (
              <div key={img.id} className={styles.imageCard}>
                <Link to={`/${img.id}`}>
                  <img
                    src={img.urls.small}
                    alt={img.alt_description}
                    className={styles.image}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
      <div className={styles.pagination}>
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>Previous</button>
        )}
        {images.length !== 0 && searchInput !== "" && <div>{page}</div>}
        {page < totalPages && (
          <button onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default MainPage;
