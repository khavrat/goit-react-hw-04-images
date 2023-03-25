import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { perPage } from '../../servises/getImages';

function Button({ children, response, currentPage, handleLoadMoreClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isVisibleBtn = () => {
      if (response === null) {
        return;
      }

      if (
        response.hits.length === 0 ||
        currentPage * perPage >= response.totalHits
      ) {
        setIsVisible(false);
      } else if (response.hits.length !== 0) {
        setIsVisible(true);
      }
    };
    isVisibleBtn();
  }, [response, currentPage]);

  const onClick = () => {
    handleLoadMoreClick();
  };

  return (
    <>
      {isVisible && (
        <button className="Button" type="button" onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}

Button.propTypes = {
  response: PropTypes.object,
  currentPage: PropTypes.number.isRequired,
  handleLoadMoreClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
