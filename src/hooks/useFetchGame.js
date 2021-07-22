import { useState, useEffect, useRef } from 'react';
import Helpers from '../api/helpers';

const useFetchGame = (id) => {
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
    helpers.getGameById(id).then((game) => {
      if (isMounted.current) {
        setState({
          data: game,
          loading: false,
        });
      }
    });
  }, [id]);

  return state;
};

export default useFetchGame;
