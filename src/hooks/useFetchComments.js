import { useState, useEffect, useRef } from 'react';
import Helpers from '../api/helpers';

const useFetchComments = (id) => {
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
    helpers.getCommentsByGame(id)
      .then((comments) => {
        if (isMounted.current) {
          setState({
            data: comments,
            loading: false,
          });
        }
      });
  }, [id]);

  return state;
};

export default useFetchComments;
