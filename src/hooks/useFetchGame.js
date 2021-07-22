import { useState, useEffect } from 'react';
import Helpers from '../api/helpers';

const useFetchGame = (id) => {
  const helpers = new Helpers();

  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    helpers.getGameById(id)
      .then((game) => {
        setState({
          data: game,
          loading: false,
        });
      });
  }, [id]);

  return state;
};

export default useFetchGame;
