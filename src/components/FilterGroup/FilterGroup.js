import React, { PureComponent } from 'react'
import { FilterItem } from '../index'
import styles from './styles.css';

class FilterGroup extends PureComponent {
  static defaultProps = {
    selectedFilters: [],
  }
  constructor(props) {
    super(props);

    this.state = {
      selectedFilters: props.selectedFilters
    }
  }

  handleFilterItemClick = (id) => () => {
    this.setState({
      selectedFilters: this.state.selectedFilters.includes(id)
        ? this.state.selectedFilters.filter(item => item !== id)
        : [...this.state.selectedFilters, id]
    });
  }

  handleApplyClick = () => {
    this.props.onApply(this.props.filter, this.state.selectedFilters);
  }

  render() {
    return (
      <div className={styles.FilterGroup}>
        <div className={styles.FilterGroup_items_container}>
          {this.props.filterItems.map(item => {
            return (
              <FilterItem
                key={item.id}
                title={item.title}
                active={this.state.selectedFilters.includes(item.id)}
                onClick={this.handleFilterItemClick(item.id)}
              />
            )
          })}
        </div>
        <div className={styles.FilterGroup_controls_container}>
          <button
            className={styles.FilterGroup_controls_container_btn}
            type="button"
            onClick={this.handleApplyClick}>
            Apply
          </button>
        </div>
      </div>
    )
  }
}

export default FilterGroup;
