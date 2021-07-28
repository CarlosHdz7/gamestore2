import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Pagination from '../../components/pagination';
import Card from '../../components/card';
import Loader from '../../components/loader';
import useFetchGames from '../../hooks/useFetchGames';
import usePrevious from '../../hooks/usePrevious';

import './List.scss';

const List = ({ setPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const previousPage = usePrevious(currentPage);

  const [gamesPerPage] = useState(8);
  const { apiData: games, isLoading, serverError } = useFetchGames();

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  useEffect(() => {
    if (previousPage !== currentPage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1 className='title'>
        <i className='bi bi-joystick' />
        {' '}
        List of games
      </h1>

      {isLoading && <Loader />}

      { (!isLoading && !serverError) ? (
        <>
          <div className='cards-container'>
            {currentGames.length > 0 ? (
              currentGames.map((game) => (
                <Card setPage={setPage} game={game} key={game.id} />
              ))
            ) : (
              <p className='no-results'>No results found :(</p>
            )}
          </div>
        </>
      ) : (
        <p>{ serverError }</p>
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
