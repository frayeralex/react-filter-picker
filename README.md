# react-filter-picker

> React component which include menu bar with picker 

[![NPM](https://img.shields.io/npm/v/react-filter-picker.svg)](https://www.npmjs.com/package/react-filter-picker) 
## Install

```bash
npm install --save react-filter-picker
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-nectar-filter'

const filterData = {
  size: [
    {
      id: "2x3",
      title: "2' X 3'",
    },
    {
      id: "3x5",
      title: "3' X 5'",
    },
  ],
  color: [
    {
      id: "blue",
      title: "Blue"
    },
    {
      id: "black",
      title: "Black"
    },
    ...
  ],
}

class Example extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          appliedFilters: {}
        };
    
        this.filterRef = React.createRef();
    }

  handleFilterChange = appliedFilters => {
    this.setState({ appliedFilters });
  }

  handleClearAllClick = () => {
    this.filterRef.current.clearAll();
  }
  render () {
    <Filter
      ref={this.filterRef}
      filterData={filterData}
      onChange={this.handleFilterChange}
    />
  }
}
```

## License

MIT © [frayeralex](https://github.com/frayeralex)
