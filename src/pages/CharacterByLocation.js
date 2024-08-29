import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CharacterByLocation = () => {
  const [locations, setLocations] = useState(JSON.parse(localStorage.getItem('locations') || '{}'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);

  const handleDeleteLocation = (location) => {
    const updatedLocations = { ...locations };
    delete updatedLocations[location];
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  const handleDeleteCharacter = (location, charId) => {
    const updatedCharacters = locations[location].filter(char => char.id !== charId);
    const updatedLocations = { ...locations, [location]: updatedCharacters };
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  const resetLocations = () => {
    localStorage.removeItem('locations');
    setLocations({});
  };

  const openModal = (location) => {
    setActiveLocation(location);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  if (Object.keys(locations).length === 0) {
    return (
      <div style={{
        color: '#0a282c',
        fontSize: '28px',
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center' 
      }}>
        No locations have been created.
        <a href="/character" style={{
          marginTop: '20px', 
          display: 'inline-block',
          backgroundColor: '#35c9dd',
          color: 'black',
          padding: '10px 20px', 
          textDecoration: 'none', 
          borderRadius: '8px', 
          fontSize: '18px', 
          fontWeight: '500', 
          cursor: 'pointer'  
        }}>
          Start Insert Character →
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', margin: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#258c9a', color: '#0a282c' }}>
      <h1>Characters by Location</h1>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{ border: '1px solid black', width: '100%', maxWidth: '375px', margin: 'auto', borderRadius: '12px', padding: '10px', backgroundColor: '#9ae4ee' }}>
        <div className="carousel-inner">
          {Object.keys(locations).map((location, idx) => (
            <div key={idx} className={`carousel-item ${idx === activeIndex ? 'active' : ''}`}>
              <div style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2>{location}</h2>
                  <p>People in Location: {locations[location].length}</p>
                </div>
                <Button style={{ width: '200px', height: '40px', borderRadius: '48px', margin: '10px', backgroundColor: '#155058', borderColor: '#155058' }} onClick={() => openModal(location)}>See Characters</Button>
                <Button style={{ width: '200px', height: '40px', borderRadius: '48px', margin: '5px', borderColor: 'red' }} variant="danger" onClick={() => handleDeleteLocation(location)}>Delete Location</Button>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev" onClick={() => handleSelect(activeIndex - 1 >= 0 ? activeIndex - 1 : locations.length - 1)}>
           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
           <span className="sr-only">Previous</span>
         </button>
         <button className="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next" onClick={() => handleSelect(activeIndex + 1 < locations.length ? activeIndex + 1 : 0)}>
           <span className="carousel-control-next-icon" aria-hidden="true"></span>
           <span className="sr-only">Next</span>
         </button>
      </div>
      <Button style={{ margin: '20px', width: '375px', height: '40px', borderRadius: '48px', backgroundColor: '#155058', borderColor: '#155058' }} onClick={resetLocations}>Reset All Locations</Button>
      <Modal show={showModal} onHide={closeModal} style={{ color: '#0a282c', backgroundColor: '#5e9299' }}>
        <Modal.Header style={{ border: 'none', justifyContent: 'flex-start', backgroundColor: '#5e9299' }}>
          <Button onClick={closeModal} style={{ marginRight: 'auto', color: 'black', fontWeight:'bold', backgroundColor: 'transparent', border: 'none' }}>X</Button>
          <Modal.Title>Characters in {activeLocation}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#5e9299' }}>
          {activeLocation && locations[activeLocation].map(char => (
            <div key={char.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', color: '#0a282c' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={char.image} alt={char.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                {char.name}
              </div>
              <Button variant="danger" onClick={() => handleDeleteCharacter(activeLocation, char.id)}>Delete</Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CharacterByLocation;