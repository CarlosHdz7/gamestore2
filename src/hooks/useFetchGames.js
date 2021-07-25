import { useState, useEffect, useRef } from 'react';
import Helpers from '../api/helpers';

const useFetchGames = () => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    isMounted.current = true;

    Helpers.getGames()
      .then((games) => {
        if (isMounted.current) {
          setApiData(games);
          setIsLoading(false);
        }
      }).catch((error) => {
        setServerError(error.message);
        setIsLoading(false);
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { isLoading, apiData, serverError };
};

export default useFetchGames;
