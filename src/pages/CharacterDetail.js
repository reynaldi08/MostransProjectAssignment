import React, { useState, useEffect } from 'react';
import { useParams , Link} from 'react-router-dom';
import './CharacterDetail.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [locations, setLocations] = useState(JSON.parse(localStorage.getItem('locations') || '{}'));
  const [newLocation, setNewLocation] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Failed to fetch character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleAssignLocation = (location = newLocation.trim()) => {
    if (!location) {
      alert("Location name cannot be empty.");
      return;
    }
    const updatedLocations = {
      ...locations,
      [location]: [...(locations[location] || []), character]
    };
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
    setNewLocation('');  // Clear the input field
    setShowModal(false);  // Close the modal
  };

  return (
    <div className="character-detail">
      {character ? (
        <div className="character-container">
          <img src={character.image} alt={character.name} />
          <p className="origin">Origin: {character.origin.name}</p>
          <hr />
          <div className="text-center">
            <h1>{character.name}</h1>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
            <p>Last Location: {character.location.name}</p>
          </div>
          <button className="btn btn-primary full-width-button assign-location-btn" style={{backgroundColor: '#87c2ca', 
              color: '#000000',
              borderRadius: '24px',
               }}onClick={() => setShowModal(true)}>
            Assign to Location
        </button>
          {showModal && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select or Add Location</h5>
                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul className="list-group">
                      {Object.keys(locations).map(loc => (
                        <button key={loc} className="list-group-item list-group-item-action" onClick={() => handleAssignLocation(loc)}>
                          {loc}
                        </button>
                      ))}
                    </ul>
                    <input
                      type="text"
                      className="form-control mt-3"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="New location name"
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    <Link to="/locations">
                      <button type="button" className="btn btn-secondary" style={{backgroundColor : '#1a646e'}}onClick={(e) => {
                        e.preventDefault(); 
                        handleAssignLocation();
                      }}>
                        Add New Location
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
      ) : <p>No character found.</p>}
    </div>
  );
};

export default CharacterDetail;