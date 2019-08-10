import React, { Component, useState } from 'react';
import { FilterPicker, FilterButton } from './components';
import PropTypes from 'prop-types';
import MobileDetect from 'mobile-detect';

import styles from './styles.css';

export default class Filter extends Component {
  static propTypes = {
    md: PropTypes.object.isRequired,
    filterData: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    document: PropTypes.object,
  };

  static defaultProps = {
    document: window.document,
    md: new MobileDetect(window.navigator.userAgent),
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      showFilterCount: props.md.phone()
        ? 2
        : props.md.tablet()
        ? 4
        : Object.keys(props.filterData).length,
      filter: null,
      activeFilters: [],
      coordinates: null,
      selectedFilters: {},
    };
  }

  componentWillUnmount() {
    this.props.document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = () => {
    this.setState({
      filter: null,
      coordinates: null,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.selectedFilters !== this.state.selectedFilters) {
      this.props.onChange(this.state.selectedFilters);
    }
    if (!prevState.filter && this.state.filter) {
      this.props.document.addEventListener('click', this.handleDocumentClick);
    }
    if (prevState.filter && !this.state.filter) {
      this.props.document.removeEventListener(
        'click',
        this.handleDocumentClick,
      );
    }
  }

  handleOnLabelClick = params => {
    this.setState({
      ...params,
      activeFilters: [params.filter],
    });
  };

  handleMoreFilterClick = params => {
    this.setState({
      ...params,
      activeFilters: Object.keys(this.props.filterData).slice(
        this.state.showFilterCount,
      ),
    });
  };

  /**
   * @public method
   */
  clearAll = () => {
    this.setState({ selectedFilters: {} });
  };

  handleOnFilterApply = selectedFilters => {
    this.setState({
      selectedFilters: {
        ...this.state.selectedFilters,
        ...selectedFilters,
      },
      filter: null,
      coordinates: null,
    });
  };

  render() {
    const show = Object.keys(this.props.filterData).slice(
      0,
      this.state.showFilterCount,
    );
    const rest = Object.keys(this.props.filterData).slice(
      this.state.showFilterCount,
    );

    return (
      <div className={styles.Filter}>
        <div className={styles.Filter_buttons_container}>
          {show.map(filter => {
            return (
              <FilterButton
                key={filter}
                onClick={this.handleOnLabelClick}
                filter={filter}
                active={
                  this.state.filter === filter ||
                  (this.state.selectedFilters[filter] || []).length > 0
                }
                selectedCount={
                  (this.state.selectedFilters[filter] || []).length
                }
              />
            );
          })}
          {rest.length > 0 && (
            <FilterButton
              onClick={this.handleMoreFilterClick}
              filter="More"
              active={
                this.state.filter === 'More' ||
                rest.some(
                  filter =>
                    (this.state.selectedFilters[filter] || []).length > 0,
                )
              }
            />
          )}
        </div>
        {this.state.coordinates && this.state.activeFilters.length > 0 && (
          <FilterPicker
            onApply={this.handleOnFilterApply}
            filterData={this.props.filterData}
            activeFilters={this.state.activeFilters}
            selectedFilters={this.state.selectedFilters}
            coordinates={this.state.coordinates}
          />
        )}
      </div>
    );
  }
}
