import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './pages.css'

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
    <div className="container mt-4">
      <h1>Characters</h1>
      <div className="row">
        {characters.map(character => (
          <div key={character.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
              <img src={character.image} className="card-img-top" alt={character.name} />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">{character.origin.name}</p>
                <div className="text-right">
                  <Link to={`/character/${character.id}`} className="btn custom-btn">
                    Click here to see more details <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharactersList;