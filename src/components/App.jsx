import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Batton';
import NotificationView from './NotificationView/NotificationView';
import Modal from './Modal/Modal';

function App() {
  const [response, setResponse] = useState(null);
  const [searchField, setSearchField] = useState('');
  const [isError, setIsError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {  
    setCurrentPage(1)
  },[searchField])

  const handleLoadMoreClick = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const handleIsError = isError => {
    setIsError(isError);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getResponseData = response => {
    setResponse(response);
  };

  const handleImageClick = selectedImage => {
    setSelectedImage(selectedImage);
  };

  const handelSearchSubmit = searchField => {
    setSearchField(searchField);
  };

  return (
    <>
      <Searchbar onSubmit={handelSearchSubmit} />
      <ImageGallery
        getResponseData={getResponseData}
        currentPage={currentPage}
        searchField={searchField}
        onClickToImage={handleImageClick}
        handleIsError={handleIsError}
      />
      <Button
        handleLoadMoreClick={handleLoadMoreClick}
        response={response}
        currentPage={currentPage}
      >
        Load more
      </Button>
      <NotificationView
        response={response}
        currentPage={currentPage}
        isError={isError}
      >
        This is the last page of the "{searchField}". Look for anything else,
        please...
      </NotificationView>
      {selectedImage && (
        <Modal closeModal={closeModal}>
          <img
            key={selectedImage.id}
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
          />
        </Modal>
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#5c919c',
            color: '#1f1d1c',
            fontSize: "18px",
          },
        }}
      />
    </>
  );
}

export default App;
