import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

const Pagination = ({
  gamesPerPage, totalPosts, paginate, currentPage,
}) => {
  const [clickedId, setClickedId] = useState(1);

  const pageNumbers = [];

  const calculateTotalPages = () => Math.ceil(totalPosts / gamesPerPage);
  const totalPages = useMemo(() => calculateTotalPages(), [totalPosts, gamesPerPage]);

  const calculatePages = useCallback(() => {
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(i);
    }
  });

  const handlePaginate = useCallback((e, number) => {
    e.preventDefault();
    setClickedId(number);
    paginate(number);
  });

  const handlePrev = useCallback((e) => {
    e.preventDefault();
    const prevPage = currentPage - 1;
    if (prevPage > 0) {
      paginate(prevPage);
      setClickedId(prevPage);
    }
  });

  const handleNext = useCallback((e) => {
    e.preventDefault();
    const nextPage = currentPage + 1;
    if (nextPage <= pageNumbers.length) {
      paginate(nextPage);
      setClickedId(nextPage);
    }
  });

  calculatePages();

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className="page-item">
          <a onClick={(e) => handlePrev(e)} href="!#" className="page-link">
            <i className="bi bi-caret-left-fill" />
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
            <i className="bi bi-caret-right-fill" />
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
