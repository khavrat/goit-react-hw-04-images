import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { fetchImages } from '../../servises/getImages';
import SearchErrorView from '../ErrorView/ErrorView';
import LoadingView from '../LoadingView/LoadingView';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';


function ImageGallery({
  onClickToImage,
  getResponseData,
  handleIsError,
  searchField,
  currentPage,
}) {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (searchField === '') {
        return;
      } else {
        try {
          setLoading(true);

          const data = await fetchImages(searchField, currentPage);
          getResponseData(data);

          if (data.hits.length === 0) {
            throw new Error(`On "${searchField}" found nothing, try again`);
          } else if (currentPage > 1) {
            setImages(prevState => [...prevState, ...data.hits]);
            setLoading(false);
            setError('');
            handleIsError(error);
          } else {
            setImages(data.hits);
            setLoading(false);
            setError('');
            handleIsError(error);
          }
        } catch (error) {
          setLoading(false);
          setError(error.message);
          handleIsError(error);
        }
      }
    }
    fetchData();
  }, [searchField, currentPage]);

  const handleImageClick = e => {
    const selectedImage = images.find(
      image => image.webformatURL === e.target.src
    );
    onClickToImage(selectedImage);
  };

  if (error) {
    return <SearchErrorView message={error} />;
  }
  if (images) {
    return (
      <>
        <ul className="ImageGallery" onClick={handleImageClick}>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ul>
        {loading && <LoadingView />}
      </>
    );
  }
}


ImageGallery.propTypes = {
  searchField: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  getResponseData: PropTypes.func.isRequired,
  handleIsError: PropTypes.func.isRequired,
  onClickToImage: PropTypes.func.isRequired,
};

export default ImageGallery;
