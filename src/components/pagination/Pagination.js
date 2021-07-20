import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

const Pagination = ({ gamesPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  const [clickedId, setClickedId] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePaginate = (e, number) => {
    e.preventDefault();
    setClickedId(number);
    paginate(number);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    const prevPage = currentPage - 1;
    if (prevPage > 0) {
      paginate(prevPage);
      setClickedId(prevPage);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    const nextPage = currentPage + 1;
    if (nextPage <= pageNumbers.length) {
      paginate(nextPage);
      setClickedId(nextPage);
    }
  };

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className="page-item">
          <a onClick={(e) => handlePrev(e)} href="!#" className="page-link">
            <i className="bi bi-caret-left-fill"></i>
          </a>
        </li>

        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={(e) => handlePaginate(e, number)}
              href="!#"
              className={
                number === clickedId
                  ? 'page-link page-link-active'
                  : 'page-link'
              }
            >
              {number}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a onClick={(e) => handleNext(e)} href="!#" className="page-link">
            <i className="bi bi-caret-right-fill"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  gamesPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
