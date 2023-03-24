import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import messageImg from 'Images/messageImg.png';

function NotificationViewEmpty(searchField, children) {
  const [isVisibleNtEmpty, setIsVisibleNtEmpty] = useState(false);

  useEffect(() => {
    setIsVisibleNtEmpty(false);

    if (searchField === '') {
      setIsVisibleNtEmpty(true);
    }
  }, [searchField]);

  return (
    <>
      {isVisibleNtEmpty && (
        <div
          className={`NtMessageEmpty ${isVisibleNtEmpty ? 'hide' : ''}`}
          role="alert"
        >
          <img src={messageImg} width="200" alt="notification message" />
          {children}
        </div>
      )}
    </>
  );
}

NotificationViewEmpty.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationViewEmpty;
