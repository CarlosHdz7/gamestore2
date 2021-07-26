import { useState, useEffect, useRef } from 'react';
import Helpers from '../api/helpers';

const useFetchComments = (id) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [serverError, setServerError] = useState(null);

  const getComments = () => {
    isMounted.current = true;
    Helpers.getCommentsByGame(id)
      .then((comments) => {
        if (isMounted.current) {
          setApiData(comments);
          setIsLoading(false);
        }
      }).catch((error) => {
        setServerError(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getComments();
    return () => {
      isMounted.current = false;
    };
  }, [id]);

  return {
    isLoading, apiData, serverError, getComments,
  };
};

export default useFetchComments;
