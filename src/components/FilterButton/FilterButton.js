import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import PropTypes from 'prop-types'

const FilterButton = (props) => {
  let boxRef = React.createRef();

  const handleOnClick = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    props.onClick({
      filter: props.filter,
      coordinates: boxRef.current.getBoundingClientRect(),
    });
  }

  return (
    <div
      ref={boxRef}
      onClick={handleOnClick}
      className={classNames(styles.FilterButton, {
        [styles.FilterButton_active]: props.active
      })}>
      <span className="label">{props.filter}</span>
      {props.selectedCount > 0 && <span className="selected-filters-count">{' '}({props.selectedCount})</span>}
    </div>
  )
}

FilterButton.propTypes = {
  filter: PropTypes.string.isRequired,
  selectedCount: PropTypes.number,
}

FilterButton.defaultProps = {
  selectedCount: 0,
}

export default FilterButton;
