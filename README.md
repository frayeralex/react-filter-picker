# react-filter-picker

> React component which include menu bar with picker 

[![NPM](https://img.shields.io/npm/v/react-filter-picker.svg)](https://www.npmjs.com/package/react-filter-picker) 
[![Build Status](https://travis-ci.org/frayeralex/react-filter-picker.svg?branch=master)](https://travis-ci.org/frayeralex/react-filter-picker)
## Install

```bash
npm install --save react-filter-picker
yarn add react-filter-picker
```

## Usage

```jsx
import React, { Component } from 'react'

import Filter from 'react-nectar-filter'

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
## Development

Building tool [create-react-library](https://www.npmjs.com/package/create-react-library)

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch your src/ module and automatically recompile it into dist/ whenever you make changes.

```bash
 npm start # runs rollup with watch flag
``` 

The second part will be running the example/ create-react-app that's linked to the local version of your module.

```bash
# (in another tab) 
cd example
npm start # runs create-react-app dev server 
```

Now, anytime you make a change to your library in src/ or to the example app's example/src, create-react-app will live-reload your local dev server so you can iterate on your component in real-time.

## Publishing to NPM

```bash
npm publish
```

This builds cjs and es versions of your module to dist/ and then publishes your module to npm.

Make sure that any npm modules you want as peer dependencies are properly marked as peerDependencies in package.json. The rollup config will automatically recognize them as peers and not try to bundle them in your module.

## License

MIT © [frayeralex](https://github.com/frayeralex)
