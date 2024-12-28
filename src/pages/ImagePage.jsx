import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ImagePage.module.css";

const API_URL = "https://api.unsplash.com/photos";
const API_KEY = process.env.REACT_APP_API_KEY;

function ImagePage() {
  const { imageId } = useParams();

  const [image, setImage] = useState({
    img: "",
    description: "",
    likes: "",
    author: "",
  });

  useEffect(() => {
    async function getImages() {
      try {
        const { data } = await axios.get(
          `${API_URL}/${imageId}?client_id=${API_KEY}`
        );
        console.log(data);

        setImage({
          img: data.urls.regular,
          description: data.alt_description,
          likes: data.likes,
          author: data.user.name,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getImages();
  }, [imageId]);

  return (
    <div className={styles.imageContainer}>
      {image.img !== "" && (
        <>
          <img
            src={image.img}
            alt={image.description}
            className={styles.image}
          />
          <div className={styles.imageDetails}>
            <p className={styles.description}>
              Description: {image.description}
            </p>
            <p className={styles.likes}>Likes: {image.likes}</p>
            <p className={styles.author}>Author: {image.author}</p>
            <Link to="/" className={styles.mainPageLink}>
              Main page
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ImagePage;
