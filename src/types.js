import PropTypes from 'prop-types';

export const filterData = PropTypes.shape({
  [PropTypes.string]: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
});

export const selectedFilters = PropTypes.shape({
  [PropTypes.string]: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
});
