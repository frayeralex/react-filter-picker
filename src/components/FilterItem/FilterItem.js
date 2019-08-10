import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';
import PropTypes from 'prop-types';

const FilterItem = props => {
  return (
    <div
      onClick={props.onClick}
      className={classNames(styles.FilterItem, {
        [styles.FilterItem_active]: props.active,
      })}
    >
      <div className="title">{props.title}</div>
    </div>
  );
};

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

FilterItem.defaultProps = {
  active: false,
  onClick: () => {},
};

export default FilterItem;
