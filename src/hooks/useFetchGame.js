import { useState, useEffect, useRef } from 'react';
import Helpers from '../api/helpers';

const useFetchGame = (id) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    isMounted.current = true;
    Helpers.getGameById(id).then((game) => {
      if (isMounted.current) {
        setApiData(game);
        setIsLoading(false);
      }
    }).catch((error) => {
      setServerError(error.message);
      setIsLoading(false);
    });
    return () => {
      isMounted.current = false;
    };
  }, [id]);

  return { isLoading, apiData, serverError };
};

export default useFetchGame;
