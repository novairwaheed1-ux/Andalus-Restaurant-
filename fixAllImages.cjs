const fs = require('fs');
let data = fs.readFileSync('src/data/menuData.ts', 'utf8');

const pizzaImg = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg';
const crepeImg = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Cr%C3%AApe_au_chocolat.jpg';
const pieImg = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Apple_pie.jpg';
const pastaImg = 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg';
const chickenImg = 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Fried_chicken_plate.jpg';
const hawawshiImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Egyptian_Hawawshi.jpg/640px-Egyptian_Hawawshi.jpg';

data = data.replace(/image:\s*'[^']+'/g, (match, offset, string) => {
    const preceding = string.substring(Math.max(0, offset - 120), offset);
    if (preceding.includes("'pizza-it'") || preceding.includes("'pizza-or'")) return `image: '${pizzaImg}'`;
    if (preceding.includes("'crepe'")) return `image: '${crepeImg}'`;
    if (preceding.includes("'pie-sav'") || preceding.includes("'pie-sw'")) return `image: '${pieImg}'`;
    if (preceding.includes("'pasta'")) return `image: '${pastaImg}'`;
    if (preceding.includes("'hawawshi'")) return `image: '${hawawshiImg}'`;
    if (preceding.includes("'sarokh'")) return `image: '${chickenImg}'`;
    return `image: '${pizzaImg}'`;
});

fs.writeFileSync('src/data/menuData.ts', data);
console.log('Fixed all images to Wikimedia Commons URLs successfully!');
