import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import messageImg from 'Images/messageImg.png';
import { perPage } from '../../servises/getImages';

function NotificationView({ response, currentPage, isError, children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);

    if (response !== null && currentPage && isError==='') {
      const isVisibleNtEnd = () => {
        if (
          (response.hits.length === 0 && isError === '') ||
          (currentPage * perPage >= response.totalHits && isError === '')
        ) {
          setIsVisible(true);
        }
      };
      isVisibleNtEnd();
    }
  }, [response, currentPage, isError]);

  return (
    <>
      {isVisible && (
        <div className={`NtMessage ${isVisible ? 'hide' : ''}`} role="alert">
          {children}
          <img src={messageImg} width="200" alt="notification message" />
        </div>
      )}
    </>
  );
}

NotificationView.propTypes = {
  response: PropTypes.object,
  currentPage: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default NotificationView;
