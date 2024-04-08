import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails'; 
import fetchGames from './api';

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const gamesData = await fetchGames();
      setGames(gamesData);
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="container mx-auto py-8 h-full">
        <Routes>
          <Route path="/" element={<GameListContainer games={games} title="Game List" />} />
          <Route path="/game/:id" element={<GameDetails title="Game Details" />} />
        </Routes>
      </div>
    </Router>
  );
};

const GameListContainer = ({ games, title }) => (
  <div className='pb-9'>
    <GameList games={games} title={title} />
  </div>
);

export default App;