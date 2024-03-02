import React from 'react'
import Image from 'next/image';

export default function HomePage () {
  return (
    <div className="home">
      <div className='flex-1 pt-12 padding-x relative pb-10'>
        <div className="absolute inset-0 z-[-1]">
           <Image src="/Pattern.svg" alt='pattern' layout="fill" objectFit="cover" />
        </div>
        <h1 className="home__title">Gutanbarag Project</h1>
        <p className="home__para">A social cataloging website that allows you to freely search its database of books, annotations, and reviews.</p>        
      </div>
    </div>
  );
}

