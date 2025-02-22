// src/components/Header.js

import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(city);
    setCity('');
  };

  return (
    <header className="header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите город"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Поиск</button>
      </form>
    </header>
  );
};

export default Header;
