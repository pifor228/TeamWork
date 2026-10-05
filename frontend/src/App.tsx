import { useEffect, useState } from "react";
import styles from "./App.module.css";
import api from './api'; 

interface Product {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
  category: string;
  is_available: string;
}

interface Movie {
  id: number;
  title: string;
  genre: string;
  description: string;
  age_rating: number;
  year: number;
  duration: string;
}

function App() {
  const [product, setProduct] = useState<Product[]>([]);
  const [movies, setMovie] = useState<Movie[]>([]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("")
  const [description, setDescription] = useState("")
  const [age_rating, setAge_Rating] = useState<number | string>()
  const [year, setYear] = useState<number | string>()


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");



  const loadProducts = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category) params.set("category", category);

api.get<Product[]>(`/product/?${params.toString()}`)

      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке товаров:", error);
      });
  };


  const resetFilters = () => {
    setSearch("");
    setCategory("");
    

    api.get<Product[]>('/product/')
      .then((response) => {
        setProduct(response.data);
      });
  };


  const createMovie = () => {
    if (!title || !genre || !year) return;
    api.post("/movies/", {
      title: title,
      genre: genre,
      duration: duration,
      age_rating: Number(age_rating),
      description: description,
      year: Number(year),
    }).then(() => {
      setTitle("");
      setGenre("");
      setYear("");
      setAge_Rating("");
      setDescription("");
      setDuration("");
      

      api.get<Movie[]>('/movies/').then((res) => setMovie(res.data));
    });
  };


  useEffect(() => {
    loadProducts();

    api.get<Movie[]>('/movies/')
      .then((response) => {
        setMovie(response.data);
      });
  }, []);

  return (
    <>



        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input className={styles.cgr}
            type="text"
            placeholder="Поиск товара"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div>
          <section className={styles.crrd}>
            <h1 className={styles.title}>Фильмы</h1>
          </section>
          
          <section className={styles.carrd}>
            {movies.map((movie) => (
              <div key={movie.id}>
                <h2 className={styles.title}>{movie.title}</h2>
                <p className={styles.text}>Жанр - {movie.genre}</p>
                <p className={styles.text}>Год выпуска - {movie.year}</p>
                <p className={styles.text}>Описание - {movie.description}</p>
                <p className={styles.text}>Длителность - {movie.duration}</p>
                <p className={styles.text}>Возростной порог - {movie.age_rating}</p>
              </div>
            ))}
          </section>
          </div>
    </>
  );
}

export default App;