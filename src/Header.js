// Header.js
import React, { useState } from "react";
import axios from "axios";
import styles from "./Header.module.css";
// import NotificationComponent from "./NotificationComponent";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9190/search?name=${query}`
      );
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

  const upcast = (movie) => {
    props.updatemovie(movie);
  };
  return (
    <div className={styles.header}>
      <h1>Movies Application</h1>
      <div className={styles.nav}>
      <Link exact to="/" className={styles.navLink} >
  Home
</Link>
<Link to="/view" className={styles.navLink} >
  View All Movies
</Link>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search Movies"
            value={query}
            onChange={handleChange}
          />
          {query && searchResults && searchResults.length > 0 && (
            <ul className={styles.searchResults}>
              {searchResults.map((movie) => (
                <li key={movie.id} onClick={() => upcast(movie)}>
                  {movie.moviename}
                </li>
              ))}
            </ul>
          )}
        </div>
      {/* <NotificationComponent message="This is a notification message!"/> */}
      </div>
    </div>
  );
};

export default Header;
