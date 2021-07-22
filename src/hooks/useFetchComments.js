import { useState, useEffect } from 'react';
import Helpers from '../api/helpers';

const useFetchComments = (id) => {
  const helpers = new Helpers();

  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    helpers.getCommentsByGame(id)
      .then((comments) => {
        setState({
          data: comments,
          loading: false,
        });
      });
  }, [id]);

  return state;
};

export default useFetchComments;
