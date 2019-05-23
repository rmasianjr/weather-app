import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <p>
      Created by:{' '}
      <a
        href="https://twitter.com/rmasianjr"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ricardo Masian Jr.
      </a>
      <span>&mdash;</span>
      <a
        href="https://github.com/rmasianjr/weather-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        View code
      </a>
    </p>
    <p>
      <span>
        API:{' '}
        <a
          href="https://fcc-weather-api.glitch.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          fcc-weather-api
        </a>{' '}
        /{' '}
        <a href="https://ipapi.co/" target="_blank" rel="noopener noreferrer">
          ipapi
        </a>{' '}
        /{' '}
        <a
          href="https://timezonedb.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          timezonedb
        </a>{' '}
        /{' '}
        <a
          href="https://developers.google.com/maps/documentation/javascript/places-autocomplete"
          target="_blank"
          rel="noopener noreferrer"
        >
          googlemaps autocomplete
        </a>
      </span>
    </p>
    <p>
      Weather Icons:{' '}
      <a
        href="https://erikflowers.github.io/weather-icons/"
        target="_blank"
        rel="noopener noreferrer"
      >
        erikflowers
      </a>
    </p>
  </footer>
);

export default Footer;
