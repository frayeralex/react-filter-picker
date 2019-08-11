const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'build', 'index.html')

const file = fs.readFileSync( indexPath );
const newFile =  file.toString().replace(/href="\/react-filter-picker\//g, 'href="./');
fs.writeFileSync(indexPath, newFile);
