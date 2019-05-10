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
        </a>
      </span>
      <span> &mdash; </span>
      <span>
        Weather Icons:{' '}
        <a
          href="https://erikflowers.github.io/weather-icons/"
          target="_blank"
          rel="noopener noreferrer"
        >
          erikflowers
        </a>
      </span>
    </p>
  </footer>
);

export default Footer;
