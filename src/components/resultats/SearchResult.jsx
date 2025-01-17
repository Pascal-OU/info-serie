import React from 'react';


import './SearchResult.css';

const SearchResult = ({ results }) => {
  if (results.length === 0) return <p className='noResult'>Aucun résultat</p>;

  return (
    <div className="results-container">
      {results.map((item, index) => {
        const show = item.show || item;


        // Casting
        const cast = show._embedded?.cast || [];

        // YouTube Video (dummy URL for demonstration, replace with real logic if available)
        const youtubeVideo = show.externals?.youtube;

        return (
          <div key={index} className="result-item">
            {/* Titre de la série */}
            <h2>{show.name}</h2>
            {/* Genres de la série */}
            <p>Genres: {show.genres?.join(',') || 'N/A'}</p>
            {/* Pays d'origine de la série */}
            <p>Pays d'origine: {show.network?.country?.name || 'N/A'}</p>
            {/* Résumé de la série */}
            <div>
              <strong>Résumé :</strong>
              <div dangerouslySetInnerHTML={{ __html: show.summary || '<p>Résumé non disponible.</p>' }} />
            </div>
            {/* Casting de la série */}
            {cast.length > 0 && (
              <div>
                <strong>Distribution principale :</strong>
                <ul>
                  {cast.map((actor, i) => (
                    <li key={i}>{actor.person.name} (rôle : {actor.character.name})</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Chaîne ou plateforme */}
            <p>
              <strong>Diffusé sur :</strong>{' '}
              {show.network ? (
                <a href={show.network.officialSite || '#'} target="_blank" rel="noopener noreferrer">
                  {show.network.name}
                </a>
              ) : (
                'N/A'
              )}
            </p>
            {/* Image */}
            {show.image && <img src={show.image.medium} alt={show.name} />}
            {/* Vidéo YouTube */}
            {youtubeVideo && (
              <iframe
                title={show.name}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${show.officialSite}`}
                allowFullScreen
              ></iframe>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResult;