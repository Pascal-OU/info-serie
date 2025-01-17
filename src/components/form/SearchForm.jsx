import React, { useState } from 'react';

import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [searchType, setSearchType] = useState('name');
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchType, searchText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type de recherche:
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="name">Par nom</option>
          <option value="theme">Par thème</option>
          <option value="actor">Par acteur</option>
        </select>
      </label>
      <label>
        Recherche:
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
        />
      </label>
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchForm;