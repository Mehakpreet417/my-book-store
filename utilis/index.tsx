interface Formats{
  [mimeType: string]: string;
}

interface Person {
  name: string;
  "birth_year": number;
  "death_year": number;
}

interface Book {
  id: number;
  title: string;
  authors: Person[]; 
  formats: Formats; 
}
  
  export const fetchBooks = async (genre: string, searchQuery?: string): Promise<Book[]> => {
    try {
      let apiUrl = `http://gutendex.com/books/?topic=${genre}`;
      if (searchQuery) {
        apiUrl += `&search=${searchQuery}`;
      }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      const books: Book[] = data.results
          .filter((book: any) => 'image/jpeg' in book.formats)
          .map((book: any) => ({
        id: book.id,
        title: book.title,
        authors: book.authors ?? [], 
        formats: book.formats ?? {}
      }));
      return books;
    } catch (error) {
      throw new Error(`Error fetching books: ${(error as Error).message}`);
    }
  };
  