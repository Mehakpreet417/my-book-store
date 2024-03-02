import React from 'react';
import Image from 'next/image';

interface GenreCardProps {
  genre: string;
  icon: string;
  onClick: () => void;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre, icon, onClick }) => {
  return (
    <div className="genre-card" onClick={onClick}>
      <Image className='genre-icon' src={icon} alt={genre} width={24} height={24} />
      <h3>{genre}</h3>
      <Image className='genre-arrow' src="/Next.svg" alt="next" width={24} height={24} />
    </div>
  );
};

export default GenreCard;