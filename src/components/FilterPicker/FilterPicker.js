import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileDetect from 'mobile-detect';
import { CollapsedBox, FilterGroup } from '../index';
import { filterData, selectedFilters } from '../../types';
import styles from './styles.css';

class FilterPicker extends Component {
  static propTypes = {
    filterData: filterData,
    selectedFilters: selectedFilters,
    activeFilters: PropTypes.arrayOf(PropTypes.string),
    onApply: PropTypes.func,
    coordinates: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    md: PropTypes.shape({
      tablet: PropTypes.func,
      mobile: PropTypes.func,
    }),
  };

  static defaultProps = {
    onApply: () => {},
    activeFilters: [],
    selectedFilters: {},
    md: new MobileDetect(window.navigator.userAgent),
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedFilters: props.selectedFilters,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeFilters !== this.props.activeFilters) {
      this.setState({ selectedFilters: this.props.selectedFilters });
    }
  }

  handleApplyClick = () => {
    this.props.onApply(this.state.selectedFilters);
  };

  getStyles() {
    const { coordinates } = this.props;
    const isDesktop = !this.props.md.phone() && !this.props.md.tablet();
    if (!isDesktop) {
      return {
        width: 'calc(100% - 20px)',
        left: 10,
        top: coordinates.top + coordinates.height + 10,
      };
    }
    const width = 300;
    const left = coordinates.left + coordinates.width / 2 - width / 2;

    return {
      width,
      left: left <= 10 ? 10 : left,
      top: coordinates.top + coordinates.height + 10,
    };
  }

  getTriangularStyles() {
    return {
      top: this.props.coordinates.top + this.props.coordinates.height,
      left: this.props.coordinates.left + this.props.coordinates.width / 2 - 10,
    };
  }

  handleContainerClick = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  handleApplyFilterGroup = (filter, selectedFilterIdList) => {
    this.setState(
      {
        selectedFilters: {
          ...this.state.selectedFilters,
          [filter]: selectedFilterIdList,
        },
      },
      this.handleApplyClick,
    );
  };

  render() {
    return (
      <React.Fragment>
        <span
          style={{ ...this.getTriangularStyles() }}
          className={styles.FilterPiker_triangular}
        />
        <div
          onClick={this.handleContainerClick}
          style={{ ...this.getStyles() }}
          className={styles.FilterPiker}
        >
          <div className={styles.FilterPiker_content}>
            {this.props.activeFilters.length > 0 &&
              this.props.activeFilters.map((filter, index) => {
                return (
                  <CollapsedBox
                    expanded={!index}
                    key={filter}
                    title={this.props.activeFilters.length > 1 ? filter : null}
                  >
                    <FilterGroup
                      filter={filter}
                      filterItems={this.props.filterData[filter]}
                      selectedFilters={this.state.selectedFilters[filter]}
                      onApply={this.handleApplyFilterGroup}
                    />
                  </CollapsedBox>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FilterPicker;
