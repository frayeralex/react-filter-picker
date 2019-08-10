import React from 'react';
import CollapsedBox from './CollapsedBox';

describe('<CollapsedBox/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CollapsedBox />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show title correctly', () => {
    const wrapper = shallow(<CollapsedBox />);
    const title = 'title';
    wrapper.setProps({ title });
    expect(
      wrapper
        .find('header span')
        .first()
        .text(),
    ).toEqual(title);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show expanded indicator correctly', () => {
    const wrapper = shallow(<CollapsedBox title="title" />);
    expect(
      wrapper
        .find('header span')
        .at(1)
        .text(),
    ).toEqual('+');
    wrapper.setState({ expanded: true });
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('header span')
        .at(1)
        .text(),
    ).toEqual('-');
  });
  it('should render children in correct place', () => {
    const wrapper = shallow(<CollapsedBox title="title" />);
    wrapper.setProps({ children: <span className="children">children</span> });
    expect(
      wrapper
        .find('.children')
        .at(0)
        .text(),
    ).toEqual('children');
    expect(wrapper).toMatchSnapshot();
  });
});
