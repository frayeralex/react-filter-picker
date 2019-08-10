import React from 'react';
import FilterPicker from './FilterPicker';
import { CollapsedBox, FilterGroup } from '../index';

const phone = jest.fn();
const tablet = jest.fn();

const props = {
  title: 'title',
  md: {
    phone,
    tablet,
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
  activeFilters: ['color'],
  coordinates: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
    width: 100,
    height: 60,
  },
};

describe('<FilterPicker/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<FilterPicker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should correct render with more then 1 active filter', () => {
    const wrapper = shallow(<FilterPicker {...props} />);
    const activeFilters = ['color', 'size'];
    expect(wrapper.find(CollapsedBox)).toHaveLength(1);
    expect(wrapper.find(FilterGroup)).toHaveLength(1);
    wrapper.setProps({ activeFilters });
    expect(wrapper.find(CollapsedBox)).toHaveLength(2);
    expect(wrapper.find(FilterGroup)).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle goupApply click correctly', () => {
    const onApply = jest.fn();
    const expectSelectedFilters = {
      color: ['1'],
    };
    const wrapper = shallow(<FilterPicker {...props} onApply={onApply} />);
    wrapper
      .find(FilterGroup)
      .first()
      .props()
      .onApply('color', ['1']);
    expect(wrapper.state()).toEqual({
      selectedFilters: expectSelectedFilters,
    });
    expect(onApply).toHaveBeenCalledWith(expectSelectedFilters);
  });
  it('should correct handle root element click', () => {
    const stopPropagation = jest.fn();
    const stopImmediatePropagation = jest.fn();
    const wrapper = shallow(<FilterPicker {...props} />);
    wrapper
      .find('div')
      .first()
      .simulate('click', {
        stopPropagation,
        nativeEvent: {
          stopImmediatePropagation,
        },
      });
    expect(stopPropagation).toHaveBeenCalled();
    expect(stopImmediatePropagation).toHaveBeenCalled();
  });
  it('should show 300px width dropdown on desktops', () => {
    const md = {
      phone: jest.fn(() => false),
      tablet: jest.fn(() => false),
    };
    const wrapper = shallow(<FilterPicker {...props} md={md} />);
    expect(
      wrapper
        .find('div')
        .first()
        .prop('style').width,
    ).toEqual(300);
  });
  it('should show fullwidht dropdown on phones', () => {
    const md = {
      phone: jest.fn(() => true),
      tablet: jest.fn(() => false),
    };
    const wrapper = shallow(<FilterPicker {...props} md={md} />);
    expect(
      wrapper
        .find('div')
        .first()
        .prop('style').width,
    ).toEqual('calc(100% - 20px)');
  })
  it('should show fullwidht dropdown on tablet', () => {
    const md = {
      phone: jest.fn(() => false),
      tablet: jest.fn(() => true),
    };
    const wrapper = shallow(<FilterPicker {...props} md={md} />);
    expect(
      wrapper
        .find('div')
        .first()
        .prop('style').width,
    ).toEqual('calc(100% - 20px)');
  })
});
