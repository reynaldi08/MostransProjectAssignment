import React from 'react';
import logo from '../components/assets/logo.png'; 
import './style.css';

const AppNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
           <a className="navbar-brand" href="/">
                <img src={logo} alt="Logo" style={{ height: '40px' }} />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Character</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/locations">Location</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default AppNavbar;