import { useState, useEffect, useRef } from 'react';
import Helpers from '../api/helpers';

const useFetchGames = () => {
  const helpers = new Helpers();
  const isMounted = useRef(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    helpers.getGames()
      .then((game) => {
        if (isMounted.current) {
          setState({
            data: game,
            loading: false,
          });
        }
      });
  }, []);

  return state;
};

export default useFetchGames;
