import React, { useState, useEffect } from 'react';

const CharacterByLocation = () => {
  const [locations, setLocations] = useState(JSON.parse(localStorage.getItem('locations') || '{}'));
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [locationToDelete, setLocationToDelete] = useState(null);

  const toggleLocation = (location) => {
    if (expandedLocation === location) {
      setExpandedLocation(null);
    } else {
      setExpandedLocation(location);
    }
  };

  const handleDeleteLocation = () => {
    const updatedLocations = { ...locations };
    delete updatedLocations[locationToDelete];
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
    setLocationToDelete(null); // Close modal
  };

  const resetLocations = () => {
    localStorage.removeItem('locations');
    setLocations({});
  };

  if (Object.keys(locations).length === 0) {
    return <div>No locations have been created.</div>;
  }

  return (
    <div>
      <h1>Characters by Location</h1>
      <button onClick={resetLocations} style={{ margin: '10px 0' }}>Reset All Locations</button>
      {Object.keys(locations).map(location => (
        <div key={location}>
          <h2 onClick={() => toggleLocation(location)}>
            {location}
            <button onClick={(e) => {
              e.stopPropagation(); // Prevent toggling when clicking the delete button
              setLocationToDelete(location);
            }}>
              🗑️
            </button>
          </h2>
          {expandedLocation === location && (
            <ul>
              {locations[location].map(char => (
                <li key={char.id}>
                  <img src={char.image} alt={char.name} style={{ width: 50, height: 50 }} />
                  {char.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {locationToDelete && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="close" onClick={() => setLocationToDelete(null)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the location '{locationToDelete}'?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setLocationToDelete(null)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteLocation}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {locationToDelete && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default CharacterByLocation;