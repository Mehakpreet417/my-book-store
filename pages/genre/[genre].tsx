import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BookList from '@/pages/components/BookList'; 
import { fetchBooks } from '@/utilis/index'; 
import Image from 'next/image';
import backImg from "@/public/Back.svg";
import searchIcon from "@/public/Search.svg";
import styles from '../../styles/styles.module.css';

interface Formats {
  [mimeType: string]: string;
}

interface Person {
  name: string;
  birth_year: number;
  death_year: number;
}

interface Book {
  id: number;
  title: string;
  authors: Person[]; 
  formats: Formats; 
}

const GenrePage: React.FC = () => {
  const router = useRouter();
  const { genre } = router.query;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (typeof genre === 'string') {
      setLoading(true);
      setError(null);
      fetchBooks(genre, searchQuery)
        .then((data) => {
          setBooks(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [genre, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleBackClick = () => {
    router.back(); 
  };

  return (
    <div>
      <div className={styles.genreTitle}>
        <Image className={styles.backArrow} src={backImg} alt="back" width={24} height={24} onClick={handleBackClick} />
        <h1 className={styles.genreName}>{genre}</h1>
      </div>
      
      <form className="styles.inputContainer" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          className={styles.searchInput}
        />
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <BookList books={books} />
    </div>
  );
};

export default GenrePage;
