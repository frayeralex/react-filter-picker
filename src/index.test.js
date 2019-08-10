import React from 'react';
import Filter from './index';
import { FilterButton, FilterPicker } from './components';

jest.mock('mobile-detect');

const props = {
  md: {
    phone: jest.fn(),
    tablet: jest.fn(),
  },
  document: {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  filterData: {
    color: [
      {
        id: '1',
        title: 'first',
      },
      {
        id: '2',
        title: 'second',
      },
    ],
    size: [
      {
        id: '1',
        title: 'first',
      },
      {
        id: '2',
        title: 'second',
      },
    ],
  },
};

const coordinates = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 30,
  width: 100,
  height: 40,
};

describe('<Filter/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Filter {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(props.md.tablet).toHaveBeenCalled();
    expect(props.md.phone).toHaveBeenCalled();
    expect(props.document.addEventListener).not.toHaveBeenCalled();
    expect(props.document.removeEventListener).not.toHaveBeenCalled();
  });
  it('should render with menu include More Filter button', () => {
    const wrapper = shallow(<Filter {...props} />);
    wrapper.setState({ showFilterCount: 1 });
    expect(
      wrapper
        .find(FilterButton)
        .at(1)
        .prop('filter'),
    ).toEqual('More');
    expect(wrapper).toMatchSnapshot();
  });
  it('should show picket correctly', () => {
    const wrapper = shallow(<Filter {...props} />);
    wrapper
      .find(FilterButton)
      .at(0)
      .simulate('click', {
        filter: 'color',
        coordinates,
      });
    expect(wrapper.state()).toEqual({
      activeFilters: ['color'],
      coordinates,
      filter: 'color',
      selectedFilters: {},
      showFilterCount: 2,
    });
    expect(wrapper.find(FilterPicker)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('should clear selected items state after call public clearAll method', function() {
    const wrapper = shallow(<Filter {...props} />);
    wrapper.setState({
      selectedFilters: {
        color: ['1'],
      },
    });
    expect(wrapper.state('selectedFilters')).toEqual({ color: ['1'] });
    wrapper.instance().clearAll();
    expect(wrapper.state('selectedFilters')).toEqual({});
  });
  it('should handle on filter apply correctly', function() {
    const wrapper = shallow(<Filter {...props} />);
    wrapper.setState({
      selectedFilters: {
        size: ['1'],
      },
    });
    expect(wrapper.state('selectedFilters')).toEqual({ size: ['1'] });
    wrapper
      .find(FilterButton)
      .at(0)
      .simulate('click', {
        filter: 'color',
        coordinates,
      });
    expect(wrapper).toMatchSnapshot();
    wrapper
      .find(FilterPicker)
      .first()
      .props()
      .onApply({ color: ['1', '2'] });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('selectedFilters')).toEqual({
      size: ['1'],
      color: ['1', '2'],
    });
    expect(wrapper.state('filter')).toEqual(null);
    expect(wrapper.state('coordinates')).toEqual(null);
    expect(wrapper).toMatchSnapshot();
  });
});
