const fs = require('fs');
let data = fs.readFileSync('src/data/menuData.ts', 'utf8');

const replacements = [
  { id: 'or-meat', img: '/IMG_20260916_191303.jpg' },
  { id: 'or-chicken', img: '/IMG_20260916_191148.jpg' },
  
  { id: 'sarokh-chicken', img: '/IMG_20260916_192003.jpg' },
  { id: 'sarokh-mix-meat', img: '/IMG_20260916_191853.jpg' },
  
  { id: 'crepe-pane', img: '/IMG_20260916_190012.jpg' },
  { id: 'crepe-strips', img: '/IMG_20260916_190435.jpg' },
  
  { id: 'pie-mix-cheese', img: '/IMG_20260916_185603.jpg' },
  { id: 'pie-sugar', img: '/IMG_20260916_190151.jpg' }
];

replacements.forEach(r => {
  // Find the block for the given id and replace its image
  const regex = new RegExp(`(id:\\s*'${r.id}'.*?image:\\s*')[^']+(\')`, 's');
  data = data.replace(regex, `$1${r.img}$2`);
});

fs.writeFileSync('src/data/menuData.ts', data);
console.log('Updated images successfully!');
