import React from 'react';
import FilterItem from './FilterItem';

const props = {
  title: 'title',
};

describe('<FilterItem/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<FilterItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should has active mode', () => {
    const wrapper = shallow(<FilterItem {...props} />);
    wrapper.setProps({ active: true });
    expect(wrapper).toMatchSnapshot();
  });
  it('should correct handle onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<FilterItem {...props} onClick={onClick} />);
    wrapper.root().simulate('click', {});
    expect(onClick).toHaveBeenCalled();
  });
});
