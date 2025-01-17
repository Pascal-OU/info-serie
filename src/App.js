import React, { useState } from 'react';
import SearchForm from './components/form/SearchForm.jsx';
import SearchResult from './components/resultats/SearchResult.jsx';
import { searchTvMaze, searchYouTube } from './services/tvmazeService.js';
import './App.css';

const App = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (type, text) => {
    // Recherche sur TvMaze
    const data = await searchTvMaze(type, text);
    // Recherche sur YouTube
    const enhancedData = await Promise.all(
      data.map(async (item) => {
        const show = item.show || item;
        const youtubeVideo = await searchYouTube(show.name);
        return { ...item, youtubeVideo };
      })
    );
    setResults(data);
  };

  return (
    
    <div className='App'>
      <div className='header'><h1>Recherche de séries TV</h1></div>
      <div className='containerSearchForm'><SearchForm onSearch={handleSearch} /></div>
      <div className='containerSearchResult'><SearchResult results={results} /></div>
    </div>
  );
};

export default App;
