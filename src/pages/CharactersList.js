import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setCharacters(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} style={{ width: 50, height: 50 }} />
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersList;