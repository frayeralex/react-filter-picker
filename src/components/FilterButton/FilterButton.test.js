import React from 'react';
import FilterButton from './FilterButton';

describe('<FilterButton/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<FilterButton filter="color" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show selected count correctly', function() {
    const wrapper = shallow(<FilterButton filter="color" />);
    wrapper.setProps({ selectedCount: 20 });
    expect(
      wrapper
        .find('.selected-filters-count')
        .first()
        .text()
        .trim(),
    ).toEqual('(20)');
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle click correct', function() {
    const onClick = jest.fn();
    const stopPropagation = jest.fn();
    const stopImmediatePropagation = jest.fn();
    const wrapper = mount(<FilterButton filter="color" onClick={onClick} />);
    wrapper.root().simulate('click', {
      stopPropagation,
      nativeEvent: {
        stopImmediatePropagation,
      },
    });
    expect(stopPropagation).toHaveBeenCalled();
    expect(stopImmediatePropagation).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith({
      filter: 'color',
      coordinates: expect.objectContaining({
        bottom: expect.any(Number),
        height: expect.any(Number),
        width: expect.any(Number),
        left: expect.any(Number),
        top: expect.any(Number),
        right: expect.any(Number),
      }),
    });
  });
});
