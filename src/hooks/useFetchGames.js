import { useState, useEffect, useRef } from 'react';
import Helpers from '../api/helpers';

const useFetchGames = () => {
  const helpers = new Helpers();
  const isMounted = useRef(true);

  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    isMounted.current = true;

    helpers.getGames()
      .then((game) => {
        if (isMounted.current) {
          setState({
            data: game,
            loading: false,
          });
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return state;
};

export default useFetchGames;
