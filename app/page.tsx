"use client"

import HomePage from '@/pages/components/HomePage';
import GenreCard from '@/pages/components/GenreCard';
import { useRouter } from "next/navigation";

interface Book {
  id: number;
  title: string;
}

export default function Home() {
  const router = useRouter();

  const handleGenreClick = (genre: string) => {
    router.push(`/genre/${genre}`);
  };

  return (
    <main className="overflow-hidden">
       <HomePage />
      <div className="genre ">
        <GenreCard genre="FICTION" icon="/Fiction.svg" onClick={() => handleGenreClick('fiction')} />
        <GenreCard genre="DRAMA" icon="/Drama.svg" onClick={() => handleGenreClick('drama')} />
        <GenreCard genre="HUMOR" icon="/Humour.svg" onClick={() => handleGenreClick('humor')} />
        <GenreCard genre="POLITICS" icon="/Politics.svg" onClick={() => handleGenreClick('politics')} />
        <GenreCard genre="PHILOSOPHY" icon="/Philosophy.svg" onClick={() => handleGenreClick('philosophy')} />
        <GenreCard genre="HISTORY" icon="/History.svg" onClick={() => handleGenreClick('history')} />
        <GenreCard genre="ADVENTURE" icon="/Adventure.svg" onClick={() => handleGenreClick('adventure')} />
      </div>
    </main>
  );
}
