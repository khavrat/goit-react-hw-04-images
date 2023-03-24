import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

function Searchbar({ onSubmit }) {
  const [searchField, setSearchField] = useState('');

  const handleChange = e => {
    const normalizeValue = e.currentTarget.value.toLowerCase();
    setSearchField(normalizeValue);
  };

  const reset = () => {
    setSearchField('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!searchField.trim()) {
      toast.error('Enter a word to search for');
    } else {
      onSubmit(searchField);
    }

    reset();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <FaSearch size={18} />
        </button>
        <label htmlFor="searchField"></label>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
          name="searchField"
          value={searchField}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
