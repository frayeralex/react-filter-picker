import React from 'react';
import FilterGroup from './FilterGroup';
import { FilterItem } from '../index';
import styles from './styles.css';

const props = {
  filter: 'colors',
  filterItems: [
    {
      id: '1',
      title: 'First',
    },
    {
      id: '2',
      title: 'Second',
    },
  ],
};

describe('<FilterGroup/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<FilterGroup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show FilterItems correctly', () => {
    const wrapper = shallow(<FilterGroup {...props} />);
    wrapper.setProps({
      filterItems: [...props.filterItems, { id: '3', title: '3' }],
    });
    expect(wrapper.find(FilterItem)).toHaveLength(3);
    expect(wrapper).toMatchSnapshot();
  });
  it('should set default selectedFilters state correctly', () => {
    const selectedFilters = ['1', '2'];
    const wrapper = shallow(
      <FilterGroup {...props} selectedFilters={selectedFilters} />,
    );
    expect(wrapper.state()).toEqual({ selectedFilters });
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle apply click correctly', () => {
    const onApply = jest.fn();
    const selectedFilters = ['1'];
    const wrapper = shallow(<FilterGroup {...props} onApply={onApply} />);
    wrapper
      .find('button')
      .first()
      .simulate('click', {});
    expect(onApply).toHaveBeenCalledWith(props.filter, []);
    wrapper.setState({ selectedFilters });
    expect(wrapper.state()).toEqual({ selectedFilters });
    wrapper
      .find('button')
      .first()
      .simulate('click', {});
    expect(onApply).toHaveBeenLastCalledWith(props.filter, ['1']);
  });
  it('should handle FilterItem click correctly', function() {
    const wrapper = shallow(<FilterGroup {...props} />);
    wrapper
      .find(FilterItem)
      .first()
      .shallow()
      .simulate('click');
    expect(wrapper.state()).toEqual({ selectedFilters: ['1'] });
    wrapper
      .find(FilterItem)
      .at(1)
      .shallow()
      .simulate('click');
    expect(wrapper.state()).toEqual({ selectedFilters: ['1', '2'] });
    wrapper
      .find(FilterItem)
      .at(0)
      .shallow()
      .simulate('click');
    expect(wrapper.state()).toEqual({ selectedFilters: ['2'] });
    wrapper
      .find(FilterItem)
      .at(1)
      .shallow()
      .simulate('click');
    expect(wrapper.state()).toEqual({ selectedFilters: [] });
  });
});
