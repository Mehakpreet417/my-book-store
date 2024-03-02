import React from 'react';
import Image from 'next/image';
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

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const handleBookClick = (format: string | undefined) => {
    if (!format) {
      // If no format is available, display an alert
      alert('No viewable version available');
      return;
    }

    // Check for preferred formats and open the link in the browser
    const preferredFormats = ['text/html', 'application/pdf', 'text/plain; charset=us-ascii'];
    const availableFormats = Object.keys(books[0].formats);

    for (const preferredFormat of preferredFormats) {
      if (availableFormats.includes(preferredFormat)) {
        window.open(books[0].formats[preferredFormat]);
        return;
      }
    }

    // If none of the preferred formats are available, open the first available format
    window.open(books[0].formats[availableFormats[0]]);
  };

  return (
    <div  className={styles.bookList}>
      {books.map((book) => (
        <div key={book.id} onClick={() => handleBookClick(book.formats['image/jpeg'])}>
          <div className={styles.bookCard}>
            <div className={styles.cover}>
              <Image className={styles.bookCover} src={book.formats['image/jpeg']} alt={`Cover of ${book.title}`} width={50} height={60} />
            </div>
            <div className={styles.bookDetails}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.authorsName}>{book.authors.map((author) => author.name).join(', ')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
