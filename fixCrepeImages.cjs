const fs = require('fs');
let data = fs.readFileSync('src/data/menuData.ts', 'utf8');

const replacements = [
  { id: 'crepe-pane', img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80' },
  { id: 'crepe-strips', img: 'https://images.unsplash.com/photo-1590082729111-9a7442eb1b0f?w=600&q=80' },
];

replacements.forEach(r => {
  const regex = new RegExp(`(id:\\s*'${r.id}'.*?image:\\s*')[^']+(\')`, 's');
  data = data.replace(regex, `$1${r.img}$2`);
});

fs.writeFileSync('src/data/menuData.ts', data);
console.log('Fixed crepe images successfully!');
