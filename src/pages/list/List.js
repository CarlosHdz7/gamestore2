import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import Helpers from '../../api/helpers';
import Pagination from '../../components/pagination';
import Card from '../../components/card';
import Loader from '../../components/loader';
import useFetchGames from '../../hooks/useFetchGames';
import './List.scss';

const List = ({ setPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(8);

  const { data: games, loading } = useFetchGames();

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1 className='title'>List of games</h1>

      {loading && <Loader />}

      {!loading && (
        <div className='cards-container'>
          {currentGames.length > 0 ? (
            currentGames.map((game) => (
              <Card setPage={setPage} game={game} key={game.id} />
            ))
          ) : (
            <p className='no-results'>No results found :(</p>
          )}
        </div>
      )}

      <Pagination
        gamesPerPage={gamesPerPage}
        totalPosts={games.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

List.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default List;
