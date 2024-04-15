import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/global.css';

const API_KEY = 'YOUR_API_KEY';
const fetchGameDetailsURL = (id) => `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(fetchGameDetailsURL(id), { cancelToken: source.token });
        setGameDetails(response.data);
        setLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching game details:', error);
        }
      }
    };

    fetchGameDetails();

    return () => {
      source.cancel('Request canceled by cleanup');
    };
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-full">
    <div className="w-10 h-10 border-t-4 border-white-500 rounded-full animate-spin"></div>
  </div>;

  const renderStars = () => {
    const filledStars = Math.floor(gameDetails.rating);
    const hasHalfStar = gameDetails.rating % 1 !== 0;
    return '★'.repeat(filledStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(5 - filledStars - (hasHalfStar ? 1 : 0));
  };

  const renderPlatforms = () => {
    return gameDetails.platforms.map((platform, index) => (
      <span key={index} className="mr-2 last:mr-0 text-white">
        {platform.platform.name}
      </span>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 ">
        <div className="col-span-full flex items-center justify-between border-b pb-4">
          <button onClick={() => navigate('/')} className="transform transition duration-300 hover:scale-110 focus:outline-none z-20">
            <i className="material-icons-outlined text-white text-3xl">arrow_back</i>
          </button>
          <h1 className="text-2xl font-semibold text-white col-span-3 flex justify-center title-game-details">{gameDetails.name}</h1>
          <div className="w-6"></div> 
        </div>
      </div>
      <div className="mt-8 relative">
        <div className="group w-full h-auto relative cursor-pointer">
          <img src={gameDetails.background_image} alt={gameDetails.name} className="w-full h-auto rounded-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center rounded-lg text-white p-4 overflow-auto">
            <h2 className="text-2xl font-bold">{gameDetails.name}</h2>
            <p>Released: {gameDetails.released}</p>
            <p>Rating: {renderStars()}</p>
            <div className="mt-4 text-sm">
              {gameDetails.description_raw}
            </div>
          </div>
          <div className="absolute inset-2 rounded-lg border border-white border-opacity-0 group-hover:border-opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="mt-4 bg-black p-2 rounded">
          <span className="text-white">Platforms: </span>{renderPlatforms()}
        </div>
      </div>
    </div>
  );
};

GameDetails.propTypes = {
  title: PropTypes.string.isRequired
};

export default GameDetails;
