import PropTypes from 'prop-types';
import messageImg from 'Images/messageImg.png';

function NotificationViewEmpty(isVisibleNtEmpty) {
  return (
    <>
      {isVisibleNtEmpty && (
        <div
          className={`NtMessageEmpty ${isVisibleNtEmpty ? 'hide' : ''}`}
          role="alert"
        >
          <img src={messageImg} width="200" alt="notification message" />
        </div>
      )}
    </>
  );
}

NotificationViewEmpty.propTypes = {
  isVisibleNtEmpty: PropTypes.bule.isRequired,
};

export default NotificationViewEmpty;
