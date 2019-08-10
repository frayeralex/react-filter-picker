import React from 'react';
import classNames from 'classnames'
import styles from './styles.css'
import PropTypes from 'prop-types'

const FilterItem = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={classNames(styles.FilterItem, {
        [styles.FilterItem_active]: props.active,
      })}>
      <div className="title">{props.title}</div>
    </div>
  )
}

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

FilterItem.defaultProps = {
  onClick: () => {},
};

export default FilterItem;
