import { useState, useEffect } from 'react';
import Helpers from '../api/helpers';

const useFetchGames = () => {
  const helpers = new Helpers();

  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    helpers.getGames()
      .then((game) => {
        setState({
          data: game,
          loading: false,
        });
      });
  }, []);

  return state;
};

export default useFetchGames;
