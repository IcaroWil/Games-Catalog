import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SocialIcons from '../components/SocialIcons';
import '../styles/global.css';

const GameList = ({ games, title }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-8 border-b border-gray-600">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-full border-2 border-gray-800 text-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(5px)',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <Link to={`/game/${game.id}`} key={game.id} className="block relative">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
                  <p className="text-gray-300">{game.description_raw}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-white text-center">
            No games found.
          </div>
        )}
      </div>
      <div className="flex justify-center mt-8">
        <SocialIcons />
      </div>
    </div>
  );
};

GameList.propTypes = {
  games: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default GameList;
