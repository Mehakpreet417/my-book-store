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
  const handleBookClick = (book: Book) => {
    // Define preferred formats in descending order of preference
    const preferredFormats = ['text/html', 'application/pdf', 'text/plain; charset=us-ascii'];
  
    // Iterate through preferred formats
    for (const format of preferredFormats) {
      // Check if the book has the current format
      if (book.formats[format]) {
        // Open the link in the browser
        window.open(book.formats[format]);
        return;
      }
    }
  
    // If none of the preferred formats are available, display an alert
    alert('No viewable version available');
  };

  return (
    <div className={styles.bookList}>
      {books?.map((book) => (
        <div key={book.id} onClick={() => handleBookClick(book)}>
          <div className={styles.bookCard}>
            <div className={styles.cover}>
              {book.formats['image/jpeg'] && (
                <Image
                  className={styles.bookCover}
                  src={book.formats['image/jpeg']}
                  alt={`Cover of ${book.title}`}
                  width={50}
                  height={60}
                />
              )}
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
