import { useState, useEffect, useRef } from 'react';
import Helpers from '../api/helpers';

const useFetchComments = (id) => {
  const helpers = new Helpers();
  const isMounted = useRef(true);

  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    isMounted.current = true;

    helpers.getCommentsByGame(id)
      .then((comments) => {
        if (isMounted.current) {
          setState({
            data: comments,
            loading: false,
          });
        }
      });
    return () => {
      isMounted.current = false;
    };
  }, [id]);

  return state;
};

export default useFetchComments;
